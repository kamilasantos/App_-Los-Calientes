import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ToastController,
  LoadingController
} from "ionic-angular";
import { FirebaseAuth } from "../../services/FirebaseAuth";
import { Toast } from "../../services/Toast";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  user: Array<{
    name: string;
    surname: string;
    tel: string;
    lawyer: boolean;
    email: string;
    password1: string;
    password2: string;
    description: string;
    category?: string;
    price?: number;
  }> = [
    {
      name: "",
      surname: "",
      tel: "",
      lawyer: false,
      email: "",
      password1: "",
      password2: "",
      description: ""
    }
  ];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firebaseAuth: FirebaseAuth,
    private toast: Toast
  ) {}

  presentToast(message: string, type: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top",
      cssClass: type
    });
    toast.present();
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: "Carregando...",
      cssClass: "spinnerVerde",
      dismissOnPageChange: true
    });
    loading.present();

    if (this.user[0].password1 != this.user[0].password2) {
      this.presentToast("Different Passwords", "error");
    } else if (Object.keys(this.user[0].password1).length < 6) {
      this.presentToast(
        "Create a password with at least 6 characters",
        "error"
      );
    } else {
      this.firebaseAuth
        .register(this.user[0].email, this.user[0].password1)
        .then(() => {
          let document: any;
          if (this.user[0].price)
            document = {
              name: this.user[0].name,
              surname: this.user[0].surname,
              tel: this.user[0].tel,
              lawyer: this.user[0].lawyer,
              email: this.user[0].email,
              fotoUrl: "AvatarPadrao.jpg",
              description: this.user[0].description,
              price: this.user[0].price
            };
          else
            document = {
              name: this.user[0].name,
              surname: this.user[0].surname,
              tel: this.user[0].tel,
              lawyer: this.user[0].lawyer,
              email: this.user[0].email,
              fotoUrl: "AvatarPadrao.jpg",
              description: this.user[0].description
            };
          this.firebaseAuth.addDocument(document).then(() => {
            loading.dismiss();
            this.presentToast(
              "Usuário cadastrado, por favor verifique seu email.",
              "success"
            );
            this.navCtrl.setRoot("LoginPage");
          });
        })
        .catch(() => console.log("Nao foi possivel cadastrar o usuário"));
    }
  }
}
