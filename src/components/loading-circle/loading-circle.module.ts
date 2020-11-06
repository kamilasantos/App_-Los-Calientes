import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingCircleComponent } from './loading-circle';

@NgModule({
  declarations: [
    LoadingCircleComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    LoadingCircleComponent
  ]
})
export class LoadingCircleComponentModule {}
