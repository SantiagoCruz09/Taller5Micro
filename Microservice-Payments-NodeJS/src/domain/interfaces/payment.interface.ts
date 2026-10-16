/**
 * Interfaz que representa un pago.
 *
 * Contiene la información básica necesaria para mostrar un pago
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada pago debe tener un `id` único, el pedido asociado, los datos
 * del cliente, el monto, un método y un estado válidos, y la fecha
 * en que se realizó en formato ISO 8601.
 *
 * @example
 * ```ts
 * const pago: Payment = {
 *   id: 1,
 *   orderId: 12,
 *   customerName: 'Carlos Ramírez',
 *   amount: 13500,
 *   method: 'Tarjeta',
 *   status: 'Aprobado',
 *   paidAt: '2025-01-15T10:30:00.000Z'
 * };
 * ```
 */
export interface Payment {
    /** Identificador único del pago */
    id: number;

    /** Identificador del pedido asociado al pago */
    orderId: number;

    /** Nombre completo del cliente que realizó el pago */
    customerName: string;

    /** Monto pagado en pesos colombianos */
    amount: number;

    /** Método de pago utilizado */
    method: PaymentMethod;

    /** Estado actual del pago */
    status: PaymentStatus;

    /** Fecha en que se realizó el pago en formato ISO 8601 */
    paidAt: string;
}

/**
 * Tipo de método de pago.
 *
 * @remarks
 * Este tipo restringe los métodos a los valores predefinidos:
 * - 'Tarjeta'
 * - 'PSE'
 * - 'Efectivo'
 * - 'Nequi'
 *
 * @example
 * ```ts
 * const metodo: PaymentMethod = 'PSE';
 * ```
 */
export type PaymentMethod = 'Tarjeta' | 'PSE' | 'Efectivo' | 'Nequi';

/**
 * Tipo de estado de un pago.
 *
 * @remarks
 * Este tipo restringe los estados a los valores predefinidos:
 * - 'Aprobado'
 * - 'Pendiente'
 * - 'Rechazado'
 * - 'Reembolsado'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const estado: PaymentStatus = 'Aprobado';
 * ```
 */
export type PaymentStatus = 'Aprobado' | 'Pendiente' | 'Rechazado' | 'Reembolsado';
