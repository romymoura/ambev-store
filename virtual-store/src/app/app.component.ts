import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'virtual-store';
  constructor(public loadingService: LoadingService) {}
}


// src/app/app.component.ts
// import { Component } from '@angular/core';
// import { LoadingService } from './core/services/loading.service';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div *ngIf="loadingService.loading$ | async" class="loading-overlay">
//       <div class="spinner-border text-primary" role="status">
//         <span class="visually-hidden">Loading...</span>
//       </div>
//     </div>
//     <router-outlet></router-outlet>
//   `,
//   styles: [`
//     .loading-overlay {
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background-color: rgba(0, 0, 0, 0.5);
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       z-index: 9999;
//     }
//   `]
// })
// export class AppComponent {
//   constructor(public loadingService: LoadingService) {}
// }
