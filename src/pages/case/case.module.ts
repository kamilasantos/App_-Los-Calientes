import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasePage } from './case';

@NgModule({
  declarations: [
    CasePage,
  ],
  imports: [
    IonicPageModule.forChild(CasePage),
  ],
  exports: [
    CasePage
  ]
})
export class CasePageModule {}
