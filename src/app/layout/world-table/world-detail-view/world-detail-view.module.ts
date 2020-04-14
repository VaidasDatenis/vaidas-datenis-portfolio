import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldDetailViewComponent } from './world-detail-view.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [WorldDetailViewComponent],
  entryComponents: [WorldDetailViewComponent],
  exports: [WorldDetailViewComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AngularSlickgridModule.forRoot({
      enableAutoResize: true,
      autoResize: {
        containerId: 'grid-container',
        sidePadding: 15
      }
    })
  ]
})
export class WorldDetailViewModule { }
