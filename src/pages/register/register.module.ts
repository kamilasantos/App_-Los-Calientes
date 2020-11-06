import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { GoPageDirectiveModule } from '../../directives/go-page/go-page.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    GoPageDirectiveModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
