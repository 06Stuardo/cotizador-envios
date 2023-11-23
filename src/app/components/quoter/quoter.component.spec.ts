import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoterComponent } from './quoter.component';

describe('QuoterComponent', () => {
  let component: QuoterComponent;
  let fixture: ComponentFixture<QuoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
