import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHoldingComponent } from './edit-holding.component';

describe('EditHoldingComponent', () => {
  let component: EditHoldingComponent;
  let fixture: ComponentFixture<EditHoldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHoldingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
