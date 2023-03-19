import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComonentsComponent } from './edit-comonents.component';

describe('EditComonentsComponent', () => {
  let component: EditComonentsComponent;
  let fixture: ComponentFixture<EditComonentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComonentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComonentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
