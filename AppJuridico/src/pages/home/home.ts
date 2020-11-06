import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  MenuController,
  ActionSheetController,
  ToastController,
  NavParams,
  Modal
} from "ionic-angular";
import { FirebaseAuth } from "../../services/FirebaseAuth";
import { DatabaseProvider } from "../../providers/databaseProvider";
import { Geolocation } from "@ionic-native/geolocation"; // importing geolocation native plugin
import { ThrowStmt } from "@angular/compiler";

declare var google; // google declaration

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  loading: boolean = true;
  map: any;
  meMarker: any;
  searchCircle: any;
  markers: any = [];
  user: any;

  constructor(
    public modalCtrl: ModalController,
    public navPrms: NavParams,
    public menuCtrl: MenuController,
    private actionsheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private firebaseAuth: FirebaseAuth,
    private databaseProvider: DatabaseProvider,
    private geolocation: Geolocation
  ) {
    this.menuCtrl.enable(true, "menuUser");
    this.user = this.firebaseAuth.getLoggedUser();
  }

  ngOnInit() {
    this.loading = true;
    this.init();
  }

  init() {
    this.geolocation
      .watchPosition({ timeout: 30000, enableHighAccuracy: true })
      .subscribe((response) => {
        // Get user location
        let location = new google.maps.LatLng(
          response.coords.latitude,
          response.coords.longitude
        );
        this.databaseProvider
          .updateLocation(
            this.firebaseAuth.getLoggedUser().id,
            response.coords.latitude,
            response.coords.longitude
          )
          .then(() => {
            this.databaseProvider
              .searchUsers(location, this.firebaseAuth.getLoggedUser().id)
              .then((foundUsers) => {
                for (let item in foundUsers) {
                  let foundLocation = new google.maps.LatLng(
                    foundUsers[item].latitude,
                    foundUsers[item].longitude
                  );
                  this.checkDistance(
                    location,
                    foundLocation,
                    this.databaseProvider.searchParams[0].distance
                  )
                    .then(() => {
                      this.loadMap(location, foundUsers);
                    })
                    .catch(() => {
                      this.loadMap(location);
                    });
                }
              });
          });
      });
  }

  checkDistance(pontoAtual: any, destino: any, distance: any) {
    // check neighborhood distance function
    return new Promise((resolve, reject) => {
      let service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pontoAtual],
          destinations: [destino],
          travelMode: "WALKING"
        },
        (response, status) => {
          if (
            response.rows[0].elements[0].distance.value <= distance &&
            response.rows[0].elements[0].distance.value != 0
          ) {
            resolve();
          } else {
            reject();
          }
        }
      );
    });
  }

  loadMap(location: any, foundUsers?: any) {
    if (this.map == undefined) {
      this.map = new google.maps.Map(document.getElementById("mapa"), {
        // map definition
        center: location,
        zoom: 17
      });

      this.meMarker = new google.maps.Marker({
        // user marker definition
        map: this.map,
        title: "Me",
        position: location,
        icon: "assets/imgs/userPin.png"
      });

      this.searchCircle = new google.maps.Circle({
        strokeColor: "#F9B600",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#F9B600",
        fillOpacity: 0.35,
        map: this.map,
        center: location,
        radius: 200
      });
    }

    for (let item in foundUsers) {
      let foundLocation = new google.maps.LatLng(
        foundUsers[item].latitude,
        foundUsers[item].longitude
      );

      let newMarker = new google.maps.Marker({
        // user marker definition
        map: this.map,
        title: foundUsers[item].name,
        position: foundLocation,
        icon: "assets/imgs/userPin.png",
        user: foundUsers[item]
      });

      while (this.markers.length) {
        this.markers.pop().setMap(null);
      }
      this.markers.push(newMarker);
    }

    for (let item in this.markers) {
      this.adicionarEventoCliqueMarker(this.markers[item]);
    }

    this.loading = false;
  }

  centerMap() {
    // center map function
    this.map.set("center", this.meMarker.get("position"));
  }

  search() {
    let searchLawyer = this.modalCtrl.create("SearchPage");
    searchLawyer.onDidDismiss(() => {
      this.init();
    });
    searchLawyer.present();
  }

  adicionarEventoCliqueMarker(marker: any) {
    // add hotels markers click events  function
    marker.addListener("click", () => {
      let actionsheet = this.actionsheetCtrl.create({
        // actionsheet definition
        title: marker.title,
        buttons: [
          {
            text: "Send Case",
            handler: () => {
              this.databaseProvider.sendCase(
                this.user,
                marker.user.oneSignalId
              );
              let toast = this.toastCtrl.create({
                message: "Case has been sent!",
                duration: 3000,
                position: "middle",
                cssClass: "success"
              });
              toast.present();
            }
          },
          {
            text: "Cancel",
            role: "destructive",
            handler: () => {}
          }
        ]
      });

      actionsheet.onWillDismiss((data) => {
        // actionsheet on close function
      });

      actionsheet.present();
    });
  }
}
