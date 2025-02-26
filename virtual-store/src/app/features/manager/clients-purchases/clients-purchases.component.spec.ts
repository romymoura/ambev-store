import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsPurchasesComponent } from './clients-purchases.component';

describe('ClientsPurchasesComponent', () => {
  let component: ClientsPurchasesComponent;
  let fixture: ComponentFixture<ClientsPurchasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsPurchasesComponent]
    });
    fixture = TestBed.createComponent(ClientsPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
