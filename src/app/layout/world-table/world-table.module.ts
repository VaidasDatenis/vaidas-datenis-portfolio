import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldTableRoutingModule } from './world-table-routing.module';
import { WorldTableComponent } from './world-table.component';
import { WorldDetailViewModule } from './world-detail-view/world-detail-view.module';
import { CreateEditWorldModule } from './create-edit-world/create-edit-world.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [WorldTableComponent],
  imports: [
    CommonModule,
    WorldTableRoutingModule,
    CreateEditWorldModule,
    WorldDetailViewModule,
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
export class WorldTableModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }
}
