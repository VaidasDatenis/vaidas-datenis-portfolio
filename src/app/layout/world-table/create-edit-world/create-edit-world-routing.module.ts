import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditWorldComponent } from './create-edit-world.component';


const routes: Routes = [
  {
    path: '',
    component: CreateEditWorldComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEditWorldRoutingModule { }
