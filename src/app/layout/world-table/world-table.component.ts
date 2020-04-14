import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularGridInstance, Column, GridOption, ExtensionName, Formatters, GridStateChange, GridOdataService } from 'angular-slickgrid';
import { WorldDetailViewComponent } from './world-detail-view/world-detail-view.component';
import { WorldTableService } from '../../shared/services/world-table.service';

@Component({
  selector: 'app-world-table',
  templateUrl: './world-table.component.html',
  styleUrls: ['./world-table.component.scss'],
  providers: [WorldTableService],
  encapsulation: ViewEncapsulation.None
})
export class WorldTableComponent implements OnInit {

  public guid: string;
  public columnDefinitions: Column[] = [];
  public gridOptions: GridOption = {};
  public dataset: any[] = [];
  public detailViewRowCount = 4;
  public angularGrid: any;
  public gridObj: any;
  public dataViewObj: any;
  public updatedObject: any;

  constructor(private worldService: WorldTableService) {
    const nullRemovingFormatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) =>
      value == 'nan' ? '' : value;

    this.columnDefinitions = [
      { id: 'id', name: 'ID', field: 'id', filterable: true, sortable: true, formatter: nullRemovingFormatter },
      { id: 'country', name: 'Country', field: 'country', filterable: true, sortable: true, formatter: nullRemovingFormatter },
      { id: 'total_cases', name: 'Total Cases', field: 'total_cases', filterable: true, sortable: true, formatter: nullRemovingFormatter },
      { id: 'deaths', name: 'Deaths', field: 'deaths', filterable: true, sortable: true, formatter: nullRemovingFormatter },
      { id: 'recovered', name: 'Recovered', field: 'recovered', filterable: true, sortable: true, formatter: nullRemovingFormatter }
    ];
    this.gridOptions = {
      enableAsyncPostRender: true,
      enableFiltering: true,
      enableAutoResize: true,
      enableCellNavigation: false,
      enableGrouping: false,
      enableRowDetailView: true,
      enableColumnReorder: false,
      autoResize: {
        containerId: 'worldTable',
        delay: 0,
        sidePadding: 10,
        bottomPadding: 10
      },
      rowSelectionOptions: {
        selectActiveRow: true
      },
      rowDetailView: {
        process: (item: any) => this.simulateServerAsyncCall(item),
        viewComponent: WorldDetailViewComponent,
        preloadComponent: WorldDetailViewComponent,
        loadOnce: true,
        singleRowExpand: true,
        useRowClick: true,
        panelRows: this.detailViewRowCount,
        parent: this
      }
    };
    this.dataset = [];
  }

  ngOnInit() {
    this.gridOptions = Object.assign({}, this.gridOptions);
  }

  deleteParentRecipe(uid) {
    console.log(uid);
    // return this.recipeService.removeRecipe(uid)
    //   .subscribe(u => {
    //     return u;
    //   });
  }

  simulateServerAsyncCall(item: any) {
    return new Promise((resolve) => {
      const itemDetail = item;
      resolve(itemDetail);
    });
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
    this.worldService.getTableData()
      .subscribe(items => {
        this.dataset = items.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          };
        });
      });
  }

  closeRowDetail(gridRowIndex: string) {
    if (this.angularGrid && this.angularGrid.extensionService) {
      const rowDetailInstance = this.angularGrid.extensionService.getSlickgridAddonInstance(ExtensionName.rowDetailView);
      const item = this.angularGrid.gridService.getDataItemByRowIndex(gridRowIndex);
      rowDetailInstance.collapseDetailView(item);
    }
  }

  onCellChanged(e, args) {
    this.updatedObject = args.item;
    this.angularGrid.resizerService.resizeGrid(10);
  }

  dataViewReady(dataview) {
    this.dataViewObj = dataview;
  }

  deleteWorldDetail(model) {
    this.worldService.deleteWorlRecord(model);
  }

}
