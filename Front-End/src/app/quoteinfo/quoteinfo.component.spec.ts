import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteinfoComponent } from './quoteinfo.component';

describe('QuoteinfoComponent', () => {
  let component: QuoteinfoComponent;
  let fixture: ComponentFixture<QuoteinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
