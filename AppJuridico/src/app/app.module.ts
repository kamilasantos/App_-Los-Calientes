import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { DatabaseProvider } from "../providers/databaseProvider";

import { FirebaseAuth } from "../services/FirebaseAuth";
import { Toast } from "../services/Toast";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { GoPageDirectiveModule } from "../directives/go-page/go-page.module";
import { IonicStorageModule } from "@ionic/storage";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { AngularFireAuthModule } from "angularfire2/auth";
import { OneSignal } from "@ionic-native/onesignal";
import { Geolocation } from "@ionic-native/geolocation"; // importing geolocation native plugin

export const firebaseConfig = {
  apiKey: "AIzaSyAnnkblm0Z-UHLngAVu4CHZpMkLcQ7zBt8",
  authDomain: "juridic-app-52416.firebaseapp.com",
  databaseURL: "https://juridic-app-52416.firebaseio.com",
  projectId: "juridic-app-52416",
  storageBucket: "",
  messagingSenderId: "566954592930"
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    GoPageDirectiveModule, //declarada aqui por que ira funcionar no menu também (app.html)
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    OneSignal,
    Geolocation,
    DatabaseProvider,
    FirebaseAuth,
    Toast,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
