import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedemandsComponent } from './quotedemands.component';

describe('QuotedemandsComponent', () => {
  let component: QuotedemandsComponent;
  let fixture: ComponentFixture<QuotedemandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotedemandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotedemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
