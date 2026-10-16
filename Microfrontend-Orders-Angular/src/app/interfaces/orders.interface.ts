/**
 * Interfaz que representa un pedido.
 *
 * Contiene la información básica necesaria para mostrar un pedido
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada pedido debe tener un `id` único, los datos del cliente,
 * el producto solicitado, la cantidad, el total en pesos,
 * un estado válido y la fecha de creación en formato ISO 8601.
 *
 * @example
 * ```ts
 * const pedido: Order = {
 *   id: 1,
 *   customerName: 'Carlos Ramírez',
 *   customerEmail: 'carlos.ramirez@example.com',
 *   product: 'Leche entera',
 *   quantity: 3,
 *   total: 13500,
 *   status: 'Pendiente',
 *   createdAt: '2025-01-15T10:30:00.000Z'
 * };
 * ```
 */
export interface Order {
    /** Identificador único del pedido */
    id: number;

    /** Nombre completo del cliente que realizó el pedido */
    customerName: string;

    /** Correo electrónico del cliente */
    customerEmail: string;

    /** Nombre del producto solicitado */
    product: string;

    /** Cantidad de unidades solicitadas */
    quantity: number;

    /** Valor total del pedido en pesos colombianos */
    total: number;

    /** Estado actual del pedido */
    status: OrderStatus;

    /** Fecha de creación del pedido en formato ISO 8601 */
    createdAt: string;
}

/**
 * Tipo de estado de un pedido.
 *
 * @remarks
 * Este tipo restringe los estados a los valores predefinidos:
 * - 'Pendiente'
 * - 'Enviado'
 * - 'Entregado'
 * - 'Cancelado'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const estado: OrderStatus = 'Entregado';
 * ```
 */
export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
