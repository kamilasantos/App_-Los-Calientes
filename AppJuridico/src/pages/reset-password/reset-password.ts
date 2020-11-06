import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

email: string;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController
  ) {
  }

presentToast(message: string,type: string) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top',
    cssClass: type
  });
  toast.present();
}

resetPassword() {
  this.afAuth.auth.sendPasswordResetEmail(this.email).then(function() {
    
  }, function(error) {
    // An error happened.
  });

  this.presentToast("Email de redefinição de senha enviado.","success");

}

}
