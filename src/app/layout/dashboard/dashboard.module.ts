import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgbAlertModule, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    NgbCarouselModule,
    NgbAlertModule,
    ChartsModule,
    NgSelectModule,
    FormsModule
  ]
})
export class DashboardModule { }
