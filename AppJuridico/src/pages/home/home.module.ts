import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { LoadingSvgComponentModule } from '../../components/loading-svg/loading-svg.module';
import { LoadingCircleComponentModule } from '../../components/loading-circle/loading-circle.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    LoadingSvgComponentModule,
    LoadingCircleComponentModule,
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
