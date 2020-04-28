import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'worldTable', loadChildren: './world-table/world-table.module#WorldTableModule' },
            { path: 'worldTable/:guid', loadChildren: './world-table/create-edit-world/create-edit-world.module#CreateEditWorldModule' },
            { path: 'mapboxJobsearch', loadChildren: './map/map.module#MapModule' },
            { path: 'mobileApp', loadChildren: './mobile-app/mobile-app.module#MobileAppModule' },
            { path: 'about', loadChildren: './about/about.module#AboutModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
