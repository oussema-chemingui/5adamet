import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedemandComponent } from './quotedemand.component';

describe('QuotedemandComponent', () => {
  let component: QuotedemandComponent;
  let fixture: ComponentFixture<QuotedemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotedemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotedemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
