import { CurrencyPipe, DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PAYMENTS_MOCK } from '../../mocks/payments.mocks';
import { PaymentsTableComponent } from './payments-table.component';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada pago', () => {
    component.payments = PAYMENTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.payments.length);
  });

  it('debería mostrar los datos del pago en cada columna', () => {
    component.payments = PAYMENTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const payment = component.payments[index];
      const paymentAmount = new CurrencyPipe('en-US').transform(payment.amount);
      const paymentDate = new DatePipe('en-US').transform(payment.paidAt, 'dd/MM/yyyy');

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(payment.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(String(payment.orderId));
      expect(columns[2].nativeElement.textContent.trim()).toBe(payment.customerName);
      expect(columns[3].nativeElement.textContent.trim()).toBe(paymentAmount);
      expect(columns[4].nativeElement.textContent.trim()).toBe(payment.method);
      expect(columns[5].nativeElement.textContent.trim()).toBe(paymentDate);
      expect(columns[6].nativeElement.textContent.trim()).toBe(payment.status);
    });
  });

  it('debería mapear cada estado a su BadgeType correcto', () => {
    expect(component.statusMap['Aprobado']).toBe('success');
    expect(component.statusMap['Pendiente']).toBe('warning');
    expect(component.statusMap['Rechazado']).toBe('danger');
    expect(component.statusMap['Reembolsado']).toBe('secondary');
  });
});
