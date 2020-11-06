import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';
import { GoPageDirectiveModule } from '../../directives/go-page/go-page.module';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    GoPageDirectiveModule,
    IonicPageModule.forChild(ResetPasswordPage),
  ],
  exports: [
    ResetPasswordPage
  ]
})
export class ResetPasswordPageModule {}
