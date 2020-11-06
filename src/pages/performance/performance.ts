import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { FirebaseAuth } from "../../services/FirebaseAuth";

@IonicPage()
@Component({
  selector: "page-performance",
  templateUrl: "performance.html"
})
export class PerformancePage {
  user: any;
  progress: number = 98;

  constructor(
    private navCtrl: NavController,
    private firebaseAuth: FirebaseAuth
  ) {
    this.user = this.firebaseAuth.getLoggedUser();
  }

  close() {
    this.navCtrl.setRoot("HomePage");
  }
}
