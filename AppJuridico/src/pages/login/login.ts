import { Component } from "@angular/core";
import {
  IonicPage,
  Platform,
  NavController,
  MenuController,
  ToastController,
  LoadingController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database-deprecated";
import { FirebaseAuth } from "../../services/FirebaseAuth";
import { LocationAccuracy } from "@ionic-native/location-accuracy"; // importing Location Accuracy Native Plugin

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user: Array<{ email: string; password: string }> = [
    { email: "", password: "" }
  ];
  viewPassword: string = "password";
  geoLocalization: boolean;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    private storage: Storage,
    private locationAccuracy: LocationAccuracy,
    private firebaseAuth: FirebaseAuth
  ) {
    if (this.platform.is("cordova"))
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest != undefined) {
          this.locationAccuracy
            .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
            .then(
              (success) => {
                this.geoLocalization = true;
              },
              (error) => {
                alert("Do you need to activate localization to use the app");
              }
            );
        }
      });
  }

  presentToast(message: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top",
      cssClass: "error"
    });
    toast.present();
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: "Carregando...",
      cssClass: "spinnerVerde",
      dismissOnPageChange: true
    });
    loading.present();

    this.firebaseAuth
      .loginWithEmailAndPassword(this.user[0].email, this.user[0].password)
      .then((userEmail) => {
        loading.dismiss();
        this.navCtrl.setRoot("HomePage");
      })
      .catch((error) => {
        loading.dismiss();
        this.presentToast(error);
      });
  }

  changeViewPassword() {
    if (this.viewPassword == "password") {
      this.viewPassword = "text";
    } else {
      this.viewPassword = "password";
    }
  }
}
