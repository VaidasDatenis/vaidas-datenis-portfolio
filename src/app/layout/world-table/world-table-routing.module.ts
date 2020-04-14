import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldTableComponent } from './world-table.component';
import { CreateEditWorldComponent } from './create-edit-world/create-edit-world.component';


const routes: Routes = [
  {
    path: '',
    component: WorldTableComponent,
    children: [
      {
        path: '/:guid',
        component: CreateEditWorldComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldTableRoutingModule { }
