import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FirebaseAuth } from "../../services/FirebaseAuth";
import { DatabaseProvider } from "../../providers/databaseProvider";

@IonicPage()
@Component({
  selector: "page-case",
  templateUrl: "case.html"
})
export class CasePage {
  user: any;
  sender: any;
  case: string;

  constructor(
    private navCtrl: NavController,
    private navPrms: NavParams,
    private firebaseAuth: FirebaseAuth,
    private databaseProvider: DatabaseProvider
  ) {
    this.user = this.firebaseAuth.getLoggedUser();
    this.sender = this.navPrms.get("sender");
    this.case = this.navPrms.get("case");
  }

  agree() {
    this.databaseProvider.sendResponse(
      this.user,
      this.sender.oneSignalId,
      "agree"
    );
    this.databaseProvider.agreeProject(this.user).then(() => {
      this.navCtrl.setRoot("HomePage");
    });
  }

  decline() {
    this.databaseProvider.sendResponse(
      this.user,
      this.sender.oneSignalId,
      "reject"
    );
    this.databaseProvider.declineProject(this.user).then(() => {
      this.navCtrl.setRoot("HomePage");
    });
  }
}
