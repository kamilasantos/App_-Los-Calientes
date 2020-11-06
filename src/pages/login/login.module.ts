import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { GoPageDirectiveModule } from '../../directives/go-page/go-page.module';
import { LocationAccuracy  } from '@ionic-native/location-accuracy'; // importing Location Accuracy Native Plugin

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    GoPageDirectiveModule,
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage
  ],
  providers: [
    LocationAccuracy
  ]
})
export class LoginPageModule {}
