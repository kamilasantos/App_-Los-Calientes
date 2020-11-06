import { Component } from '@angular/core';

@Component({
  selector: 'loading-circle',
  templateUrl: 'loading-circle.html'
})
export class LoadingCircleComponent {

loading: number = 0;

  constructor() {
    setInterval(() => {
      if (this.loading == 3) {
        this.loading = 1;
      } else {
        this.loading++;
      }
    }, 300);
  }

}
