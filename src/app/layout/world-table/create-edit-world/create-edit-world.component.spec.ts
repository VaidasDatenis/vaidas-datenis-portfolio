import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWorldComponent } from './create-edit-world.component';

describe('CreateEditWorldComponent', () => {
  let component: CreateEditWorldComponent;
  let fixture: ComponentFixture<CreateEditWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
