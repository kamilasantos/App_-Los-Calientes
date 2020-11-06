import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerformancePage } from './performance';
import { ProgressBarComponent } from '../../components/progressbar/progressbar';

@NgModule({
  declarations: [
    ProgressBarComponent,
    PerformancePage,
  ],
  imports: [
    IonicPageModule.forChild(PerformancePage),
  ],
  exports: [
    PerformancePage
  ]
})
export class PerformancePageModule {}
