import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServProvidersComponent } from './serv-providers.component';

describe('ServProvidersComponent', () => {
  let component: ServProvidersComponent;
  let fixture: ComponentFixture<ServProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
