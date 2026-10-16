import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Order, OrderStatus } from '../../interfaces/orders.interface';

/**
 * Componente de tabla de pedidos.
 *
 * Se utiliza para mostrar un listado de pedidos en una tabla,
 * mostrando información como el cliente, el producto, la cantidad,
 * el total, la fecha y un badge visual que indica el estado
 * de cada pedido.
 *
 * @remarks
 * Este componente recibe los pedidos desde un componente padre
 * a través del Input `orders` y utiliza el mapeo `statusMap`
 * para asignar colores a los badges según el estado.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-orders-table [orders]="ordersList"></app-orders-table>
 * ```
 */
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class OrdersTableComponent {
  /**
   * Listado de pedidos que se mostrarán en la tabla.
   * @type {Order[]}
   * @remarks
   * Este Input permite pasar un array de pedidos desde un componente padre,
   * generalmente `OrdersPage`. Cada pedido debe cumplir la interfaz `Order`.
   */
  @Input() orders: Order[] = [];

  /**
   * Mapeo de estados de pedidos a tipos de Badge.
   * @type {Record<OrderStatus, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada estado:
   * - 'Pendiente' → 'warning' (amarillo)
   * - 'Enviado' → 'primary' (azul)
   * - 'Entregado' → 'success' (verde)
   * - 'Cancelado' → 'danger' (rojo)
   *
   * Esto permite que en la tabla cada pedido tenga un badge visual que indique su estado
   * de forma clara para el usuario.
   */
  statusMap: Record<OrderStatus, BadgeType> = {
    'Pendiente': 'warning',
    'Enviado': 'primary',
    'Entregado': 'success',
    'Cancelado': 'danger',
  }
}
