import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { DatabaseProvider } from "../../providers/databaseProvider";
import { FirebaseAuth } from "../../services/FirebaseAuth";
import { Camera, CameraOptions } from "@ionic-native/camera";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  user: any;

  constructor(
    private navCtrl: NavController,
    private firebaseAuth: FirebaseAuth,
    private databaseProvider: DatabaseProvider,
    private camera: Camera
  ) {
    this.user = this.firebaseAuth.getLoggedUser();
  }

  close() {
    this.navCtrl.setRoot("HomePage");
  }

  choosePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.uploadPicture("data:image/jpeg;base64," + imageData);
      },
      (err) => {
        alert(err);
      }
    );
  }

  uploadPicture(dataUrl: any) {
    let storageRef = firebase.storage().ref(this.user.id);

    storageRef.putString(dataUrl, "data_url").then((snapshot) => {
      this.databaseProvider.updateImg(this.user.id, snapshot.downloadURL);
    });
  }
}
