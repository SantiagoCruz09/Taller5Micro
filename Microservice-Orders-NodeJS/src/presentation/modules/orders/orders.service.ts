import { faker } from '@faker-js/faker';
import { Order, OrderStatus } from '../../../domain/interfaces/order.interface';

/**
 * Servicio encargado de la generación y gestión de pedidos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar pedidos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class OrdersService {

  /**
   * Estados disponibles para los pedidos.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente un estado
   * a cada pedido generado.
   */
  private statuses: OrderStatus[] = [
    'Pendiente',
    'Enviado',
    'Entregado',
    'Cancelado'
  ];

  /**
   * Obtiene un listado de pedidos generados dinámicamente.
   *
   * @param countOrders Cantidad de pedidos a generar
   * @returns Promesa que resuelve un arreglo de pedidos
   *
   * @example
   * ```ts
   * const orders = await ordersService.getAllOrders(10);
   * ```
   */
  public async getAllOrders(countOrders: number): Promise<Order[]> {
    const orders: Promise<Order>[] = [];

    for (let i = 1; i <= countOrders; i++) {
      orders.push(this.generateOrder(i));
    }

    return Promise.all(orders);
  }

  /**
   * Genera un pedido ficticio.
   *
   * @remarks
   * El total del pedido se calcula multiplicando la cantidad
   * de unidades por un precio unitario generado aleatoriamente.
   *
   * @param id Identificador único del pedido
   * @returns Promesa que resuelve un pedido generado
   */
  private generateOrder(id: number): Promise<Order> {
    const quantity = faker.number.int({ min: 1, max: 20 });
    const unitPrice = Number(
      faker.commerce.price({ min: 5000, max: 500000, dec: 0 })
    );

    return Promise.resolve({
      id,
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      product: faker.commerce.productName(),
      quantity,
      total: quantity * unitPrice,
      status: faker.helpers.arrayElement(this.statuses),
      createdAt: faker.date.past().toISOString(),
    });
  }
}
