import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EmptyStateComponent } from './empty-state';

@NgModule({
  declarations: [
    EmptyStateComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    EmptyStateComponent
  ]
})
export class EmptyStateComponentModule {}
