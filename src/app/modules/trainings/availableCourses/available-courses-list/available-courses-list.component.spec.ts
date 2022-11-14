import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCoursesListComponent } from './available-courses-list.component';

describe('AvailableCoursesListComponent', () => {
  let component: AvailableCoursesListComponent;
  let fixture: ComponentFixture<AvailableCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableCoursesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
