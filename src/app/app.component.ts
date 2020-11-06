import { Component, ViewChild, enableProdMode } from "@angular/core";
import { Nav, Platform, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from "angularfire2/auth";
import { OneSignal } from "@ionic-native/onesignal";
import { FirebaseAuth } from "../services/FirebaseAuth";

enableProdMode();
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;
  rootPage: any;
  pages: Array<{ title: string; component: any; icon: string; badge: string }>;
  activePage: any;
  user: any;
  group: any;
  dataPush: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public menuCtrl: MenuController,
    public afAuth: AngularFireAuth,
    private oneSignal: OneSignal,
    private firebaseAuth: FirebaseAuth
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: "HomePage", icon: "home", badge: "" },
      { title: "Profile", component: "ProfilePage", icon: "person", badge: "" },
      {
        title: "Performance",
        component: "PerformancePage",
        icon: "analytics",
        badge: ""
      }
    ];

    this.activePage = this.pages[0];
  }

  menuOpened() {
    this.user = this.firebaseAuth.getLoggedUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get("user").then((val) => {
        if (val != undefined) {
          this.firebaseAuth.setLoggedUser(val);
          this.user = val;
          this.rootPage = "HomePage";
        } else {
          this.rootPage = "LoginPage";
        }
      });
      if (this.platform.is("cordova")) {
        this.splashScreen.hide();
        this.statusBar.backgroundColorByHexString("#622E18");
        this.keyboard.disableScroll(true);
        this.menuCtrl.enable(false, "menuUser");
        this.oneSignal.startInit(
          "991eb9bc-41f1-4e16-a680-91492f169c67",
          "159703113896"
        );
        this.oneSignal.inFocusDisplaying(
          this.oneSignal.OSInFocusDisplayOption.Notification
        );
        this.oneSignal.handleNotificationReceived().subscribe(() => {});
        this.oneSignal.handleNotificationOpened().subscribe((data) => {
          this.nav.setRoot(data.notification.payload.additionalData.page, {
            sender: data.notification.payload.additionalData.sender,
            case: data.notification.payload.additionalData.case
          });
        });
        this.oneSignal.endInit();
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }

  exit() {
    this.menuCtrl.enable(false, "menuUser");
    this.nav.setRoot("LoginPage");
    this.firebaseAuth.logout();
  }
}
