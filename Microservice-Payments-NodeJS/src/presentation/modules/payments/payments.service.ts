import { faker } from '@faker-js/faker';
import { Payment, PaymentMethod, PaymentStatus } from '../../../domain/interfaces/payment.interface';

/**
 * Servicio encargado de la generación y gestión de pagos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar pagos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class PaymentsService {

  /**
   * Métodos de pago disponibles.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente un método
   * a cada pago generado.
   */
  private methods: PaymentMethod[] = [
    'Tarjeta',
    'PSE',
    'Efectivo',
    'Nequi'
  ];

  /**
   * Estados disponibles para los pagos.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente un estado
   * a cada pago generado.
   */
  private statuses: PaymentStatus[] = [
    'Aprobado',
    'Pendiente',
    'Rechazado',
    'Reembolsado'
  ];

  /**
   * Obtiene un listado de pagos generados dinámicamente.
   *
   * @param countPayments Cantidad de pagos a generar
   * @returns Promesa que resuelve un arreglo de pagos
   *
   * @example
   * ```ts
   * const payments = await paymentsService.getAllPayments(10);
   * ```
   */
  public async getAllPayments(countPayments: number): Promise<Payment[]> {
    const payments: Promise<Payment>[] = [];

    for (let i = 1; i <= countPayments; i++) {
      payments.push(this.generatePayment(i));
    }

    return Promise.all(payments);
  }

  /**
   * Genera un pago ficticio.
   *
   * @param id Identificador único del pago
   * @returns Promesa que resuelve un pago generado
   */
  private generatePayment(id: number): Promise<Payment> {
    return Promise.resolve({
      id,
      orderId: faker.number.int({ min: 1, max: 100 }),
      customerName: faker.person.fullName(),
      amount: Number(
        faker.commerce.price({ min: 5000, max: 500000, dec: 0 })
      ),
      method: faker.helpers.arrayElement(this.methods),
      status: faker.helpers.arrayElement(this.statuses),
      paidAt: faker.date.past().toISOString(),
    });
  }
}
