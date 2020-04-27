import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public collapedSideBar: boolean;

  constructor() {}

  ngOnInit() {}

  public receiveCollapsed($event) {
    this.collapedSideBar = $event;
    console.log("normal");
  }
}
