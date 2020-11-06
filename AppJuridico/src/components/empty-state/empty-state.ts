import { Component, Input } from '@angular/core';

@Component({
  selector: 'empty-state',
  templateUrl: 'empty-state.html'
})
export class EmptyStateComponent {

  @Input('img') img: string;
  @Input('title') title: string;

}
