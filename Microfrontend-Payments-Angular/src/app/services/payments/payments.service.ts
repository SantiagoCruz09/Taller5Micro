import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../../interfaces/payments.interface';

/**
 * Servicio encargado de la gestión de pagos.
 *
 * Proporciona métodos para obtener información de pagos
 * desde la API REST.
 *
 * @example
 * ```ts
 * constructor(private paymentsService: PaymentsService) {}
 *
 * this.paymentsService.getAllPayments(10).subscribe(payments => {
 *   console.log(payments);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class PaymentsService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de pagos desde el backend.
   *
   * @param countPayments Número de pagos a obtener.
   * @returns Observable que emite un array de pagos.
   *
   * @example
   * ```ts
   * this.paymentsService.getAllPayments(5).subscribe(payments => {
   *   console.log(payments);
   * });
   * ```
   */
  getAllPayments(countPayments: number): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`http://localhost:3003/api/payments/${countPayments}`);
  }
}
