import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldDetailViewComponent } from './world-detail-view.component';

describe('WorldDetailViewComponent', () => {
  let component: WorldDetailViewComponent;
  let fixture: ComponentFixture<WorldDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
