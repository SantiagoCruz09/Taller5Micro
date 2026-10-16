import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Payment, PaymentStatus } from '../../interfaces/payments.interface';

/**
 * Componente de tabla de pagos.
 *
 * Se utiliza para mostrar un listado de pagos en una tabla,
 * mostrando información como el pedido asociado, el cliente,
 * el monto, el método de pago, la fecha y un badge visual que
 * indica el estado de cada pago.
 *
 * @remarks
 * Este componente recibe los pagos desde un componente padre
 * a través del Input `payments` y utiliza el mapeo `statusMap`
 * para asignar colores a los badges según el estado.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-payments-table [payments]="paymentsList"></app-payments-table>
 * ```
 */
@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class PaymentsTableComponent {
  /**
   * Listado de pagos que se mostrarán en la tabla.
   * @type {Payment[]}
   * @remarks
   * Este Input permite pasar un array de pagos desde un componente padre,
   * generalmente `PaymentsPage`. Cada pago debe cumplir la interfaz `Payment`.
   */
  @Input() payments: Payment[] = [];

  /**
   * Mapeo de estados de pagos a tipos de Badge.
   * @type {Record<PaymentStatus, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada estado:
   * - 'Aprobado' → 'success' (verde)
   * - 'Pendiente' → 'warning' (amarillo)
   * - 'Rechazado' → 'danger' (rojo)
   * - 'Reembolsado' → 'secondary' (gris)
   *
   * Esto permite que en la tabla cada pago tenga un badge visual que indique su estado
   * de forma clara para el usuario.
   */
  statusMap: Record<PaymentStatus, BadgeType> = {
    'Aprobado': 'success',
    'Pendiente': 'warning',
    'Rechazado': 'danger',
    'Reembolsado': 'secondary',
  }
}
