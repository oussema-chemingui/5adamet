import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteresponsesComponent } from './quoteresponses.component';

describe('QuoteresponsesComponent', () => {
  let component: QuoteresponsesComponent;
  let fixture: ComponentFixture<QuoteresponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteresponsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteresponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
