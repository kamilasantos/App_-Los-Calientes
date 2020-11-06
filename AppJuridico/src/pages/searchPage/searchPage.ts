import { Component } from "@angular/core";
import { IonicPage, ViewController } from "ionic-angular";
import { FirebaseAuth } from "../../services/FirebaseAuth";
import { DatabaseProvider } from "../../providers/databaseProvider";

@IonicPage()
@Component({
  selector: "page-searchPage",
  templateUrl: "searchPage.html"
})
export class SearchPage {
  user: any;
  search: Array<{
    price: number;
    distance: number;
    category: string;
    case: string;
  }> = [{ price: 0, distance: 0, category: "", case: "" }];

  constructor(
    public viewCtrl: ViewController,
    private firebaseAuth: FirebaseAuth,
    private databaseProvider: DatabaseProvider
  ) {
    this.user = this.firebaseAuth.getLoggedUser();
  }

  searchLawyer(search: any) {
    this.databaseProvider.setSearchParams(search).then(() => {
      this.viewCtrl.dismiss();
    });
  }
}
