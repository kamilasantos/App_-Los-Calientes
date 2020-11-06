import { Component } from '@angular/core';

@Component({
  selector: 'loading-svg',
  templateUrl: 'loading-svg.html'
})
export class LoadingSvgComponent {

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
