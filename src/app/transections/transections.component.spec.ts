import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransectionsComponent } from './transections.component';

describe('TransectionsComponent', () => {
  let component: TransectionsComponent;
  let fixture: ComponentFixture<TransectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
