import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorldTableComponent } from '../world-table.component';

@Component({
  selector: 'app-world-detail-view',
  templateUrl: './world-detail-view.component.html',
  styleUrls: ['./world-detail-view.component.scss']
})
export class WorldDetailViewComponent implements OnInit {
  model: {
    id: string;
    country: string;
    total_cases: number;
    deaths: number;
    recovered: number;
  };
  addon: any;
  grid: any;
  dataView: any;
  parent: WorldTableComponent;
  guid: string;
  data: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editRecipe() {
    console.log('Editing...');
    this.router.navigate(['/worldTable/' + this.model.id]);
  }

  deleteWorldRow(model) {
    if (confirm('Are You sure?')) {
      this.addon.collapseAll();
      this.dataView.deleteItem(model.id);
      this.parent.deleteWorldDetail(model);
    }
  }

}
