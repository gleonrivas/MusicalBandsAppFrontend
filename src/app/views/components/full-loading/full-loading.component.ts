import { Component } from '@angular/core';

@Component({
  selector: 'app-full-loading',
  template: `
    <div class="loading-wrapper">
      <ion-spinner class="loading-text" color="danger"></ion-spinner>
    </div>
  `,
  styleUrls: ['./full-loading.component.css']
})
export class FullLoadingComponent { }
