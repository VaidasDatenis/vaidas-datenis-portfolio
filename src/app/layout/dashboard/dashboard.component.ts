import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { DashboardService } from '../../shared/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public loadedData;
  public countries = [];
  public selectedCountry: string;
  public selectedCountry2: string;
  public selectedCountry3: string;
  public selectedCountry4: string;
  public selectedCountry5: string;
  public searchedData: any;

  // BAR
  public barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Top Countries'
    }
  };
  public barChartLabels: Label[] = ['USA', 'Italy', 'Spain', 'Germany', 'UK'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [395030, 135586, 140510, 103228, 55246], label: 'Confirmed Cases' },
    { data: [12740, 17129, 13795, 1861, 6159], label: 'Deaths' },
    { data: [22891, 26491, 48021, 46300, 135], label: 'Recovered'}
  ];
  // PIE
  public pieChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'World Pie'
    }
  };
  public pieChartLabels: Label[] = ['Confirmed Cases', 'Deaths', 'Recovered'];
  public pieChartData: SingleDataSet = [
    1507912,
    88813,
    337180
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
    this.getData();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // This handles error: Expression has changed after it was checked.
    this.cdr.detectChanges();
  }

  getData() {
    this.dashboardService.getCases()
      .subscribe(res => {
        this.loadedData = res.map(data => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          };
        });
        for (const item of this.loadedData) {
          this.countries.push(item.country);
        }
      });
  }

  searchData(value: string) {
    this.searchedData = this.loadedData.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
      item[k].toString().toLowerCase()
      .includes(value.toLowerCase()))
    );
    this.barChartLabels[0] = this.searchedData[0].country;
    this.barChartData[0].data[0] = this.searchedData[0].total_cases[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[1].data[0] = this.searchedData[0].deaths[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[2].data[0] = this.searchedData[0].recovered[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    // pie
    this.pieChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: this.searchedData[0].country[0]
      }
    };
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartPlugins = [];
    this.pieChartData[0] = this.searchedData[0].total_cases[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.pieChartData[1] = this.searchedData[0].deaths[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.pieChartData[2] = this.searchedData[0].recovered[0].toString().replace(',', '').replace(',', '').replace(' ', '');
  }

  searchData2(value: string) {
    this.searchedData = this.loadedData.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
      item[k].toString().toLowerCase()
      .includes(value.toLowerCase()))
    );
    this.barChartLabels[1] = this.searchedData[0].country;
    this.barChartData[0].data[1] = this.searchedData[0].total_cases[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[1].data[1] = this.searchedData[0].deaths[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[2].data[1] = this.searchedData[0].recovered[0].toString().replace(',', '').replace(',', '').replace(' ', '');
  }

  searchData3(value: string) {
    this.searchedData = this.loadedData.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
      item[k].toString().toLowerCase()
      .includes(value.toLowerCase()))
    );
    this.barChartLabels[2] = this.searchedData[0].country;
    this.barChartData[0].data[2] = this.searchedData[0].total_cases[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[1].data[2] = this.searchedData[0].deaths[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[2].data[2] = this.searchedData[0].recovered[0].toString().replace(',', '').replace(',', '').replace(' ', '');
  }

  searchData4(value: string) {
    this.searchedData = this.loadedData.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
      item[k].toString().toLowerCase()
      .includes(value.toLowerCase()))
    );
    this.barChartLabels[3] = this.searchedData[0].country;
    this.barChartData[0].data[3] = this.searchedData[0].total_cases[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[1].data[3] = this.searchedData[0].deaths[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[2].data[3] = this.searchedData[0].recovered[0].toString().replace(',', '').replace(',', '').replace(' ', '');
  }

  searchData5(value: string) {
    this.searchedData = this.loadedData.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
      item[k].toString().toLowerCase()
      .includes(value.toLowerCase()))
    );
    this.barChartLabels[4] = this.searchedData[0].country;
    this.barChartData[0].data[4] = this.searchedData[0].total_cases[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[1].data[4] = this.searchedData[0].deaths[0].toString().replace(',', '').replace(',', '').replace(' ', '');
    this.barChartData[2].data[4] = this.searchedData[0].recovered[0].toString().replace(',', '').replace(',', '').replace(' ', '');
  }

  // constructPie() {
  //   const value = 'Total:';
  //   this.searchedData = this.loadedData.filter(item =>
  //     Object.keys(item).some(k => item[k] != null &&
  //     item[k].toString().toLowerCase()
  //     .includes(value.toLowerCase()))
  //   );
  //   this.pieChartData[0] = this.searchedData[6].total_cases[0].toString().replace(',', '').replace(' ', '').replace(',', '');
  //   this.pieChartData[1] = this.searchedData[6].deaths[0].toString().replace(',', '').replace(' ', '').replace(',', '');
  //   this.pieChartData[2] = this.searchedData[6].recovered[0].toString().replace(',', '').replace(' ', '').replace(',', '');
  // }

}
