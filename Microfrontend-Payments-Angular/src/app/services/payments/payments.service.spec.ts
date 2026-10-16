import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Payment } from '../../interfaces/payments.interface';
import { PAYMENTS_MOCK } from '../../mocks/payments.mocks';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PaymentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  describe('Creación del servicio', () => {

    it('debería crearse correctamente', () => {
      expect(service).toBeTruthy();
    });

  });

  describe('getAllPayments', () => {

    it('debería realizar una petición GET y retornar una lista de pagos', () => {
      const countPayments = 5;
      const mockPayments: Payment[] = PAYMENTS_MOCK;

      service.getAllPayments(countPayments).subscribe((payments) => {
        expect(payments).toEqual(mockPayments);
        expect(payments.length).toBe(mockPayments.length);
      });

      const req = httpMock.expectOne(`http://localhost:3003/api/payments/${countPayments}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockPayments);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countPayments = 3;

      service.getAllPayments(countPayments).subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`http://localhost:3003/api/payments/${countPayments}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

  });

});
