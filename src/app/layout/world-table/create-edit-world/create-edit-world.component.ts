import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorldTableService } from '../../../shared/services/world-table.service';


@Component({
  selector: 'app-create-edit-world',
  templateUrl: './create-edit-world.component.html',
  styleUrls: ['./create-edit-world.component.scss']
})
export class CreateEditWorldComponent implements OnInit {
  @ViewChild('worldData', { static: false }) eForm: NgForm;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private worldService: WorldTableService) { }

  public guid: string;
  public worldForm: FormGroup;
  public isFetching = false;
  public data: any = [];
  public error = '';
  public status: string;

  ngOnInit() {
    this.worldForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      total_cases: new FormControl(null, Validators.required),
      deaths: new FormControl(null, Validators.required),
      recovered: new FormControl(null, Validators.required)
    });

    this.activeRoute.params.subscribe(
      (param: any) => {
        this.guid = param.guid;
        if (this.guid === '0') {
          console.log('Creating new record.');
        } else {
          this.isFetching = true;
          console.log('Editing Record: ' + this.guid);
          this.worldService.getDataById(this.guid)
            .subscribe(world => {
              console.log(world);
              this.worldForm.patchValue({
                country: world['country'].toString().replace(' ', ''),
                total_cases: world['total_cases'].toString().replace(',', '').replace(' ', '').replace(',', ''),
                deaths: world['deaths'].toString().replace(',', '').replace(' ', '').replace(',', ''),
                recovered: world['recovered'].toString().replace(',', '').replace(' ', '').replace(',', '')
              });
            });
        }
      }
    );
  }

  updateData(worldData) {
    // this.worldService.updateWorldData(worldData);
    this.isFetching = true;
    this.worldService.getDataById(this.guid)
      .subscribe(ref => {
        this.worldService.updateWorldData(this.guid, worldData);
          // .subscribe(data => {
          //   return data;
          // });
      });
    this.isFetching = false;
    this.router.navigate(['worldTable']);
  }

}
