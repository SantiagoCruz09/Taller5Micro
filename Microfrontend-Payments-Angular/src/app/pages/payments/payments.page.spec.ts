import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPage } from './payments.page';
import { provideHttpClient } from '@angular/common/http';
import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentsTableComponent } from '../../components/payments-table/payments-table.component';
import { of, throwError } from 'rxjs';
import { PAYMENTS_MOCK } from '../../mocks/payments.mocks';
import { By } from '@angular/platform-browser';

describe('PaymentsPage', () => {
  let component: PaymentsPage;
  let fixture: ComponentFixture<PaymentsPage>;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsPage, PaymentsTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsPage);
    component = fixture.componentInstance;
    paymentsService = TestBed.inject(PaymentsService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllPayments al iniciar', () => {
    const spyGetAllPayments = jest.spyOn(paymentsService, 'getAllPayments').mockReturnValue(of(PAYMENTS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllPayments).toHaveBeenCalled();
  });

  it('debería asignar los pagos recibidos del servicio', () => {
    jest.spyOn(paymentsService, 'getAllPayments').mockReturnValue(of(PAYMENTS_MOCK));
    fixture.detectChanges();
    expect(component.payments).toEqual(PAYMENTS_MOCK);
  });

  it('debería pasar los pagos al componente payments-table', () => {
    jest.spyOn(paymentsService, 'getAllPayments').mockReturnValue(of(PAYMENTS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(PaymentsTableComponent))
      .componentInstance;
    expect(tableComponent.payments).toEqual(PAYMENTS_MOCK);
  });

  it('debería manejar el error cuando falla getAllPayments', () => {
    component.payments = [];
    const errorResponse = new Error('Error al cargar pagos');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(paymentsService, 'getAllPayments').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(paymentsService.getAllPayments).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.payments.length).toBe(0);
  });
});
