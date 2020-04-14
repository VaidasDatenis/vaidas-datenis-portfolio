import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditWorldRoutingModule } from './create-edit-world-routing.module';
import { CreateEditWorldComponent } from './create-edit-world.component';


@NgModule({
  declarations: [CreateEditWorldComponent],
  exports: [CreateEditWorldComponent],
  imports: [
    CommonModule,
    CreateEditWorldRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateEditWorldModule { }
