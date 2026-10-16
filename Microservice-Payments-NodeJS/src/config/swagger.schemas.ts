/**
 * @openapi
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       description: Representa un pago del sistema
 *       required:
 *         - id
 *         - orderId
 *         - customerName
 *         - amount
 *         - method
 *         - status
 *         - paidAt
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         orderId:
 *           type: number
 *           example: 12
 *         customerName:
 *           type: string
 *           example: Carlos Ramírez
 *         amount:
 *           type: number
 *           example: 13500
 *         method:
 *           type: string
 *           enum:
 *             - Tarjeta
 *             - PSE
 *             - Efectivo
 *             - Nequi
 *           example: Tarjeta
 *         status:
 *           type: string
 *           enum:
 *             - Aprobado
 *             - Pendiente
 *             - Rechazado
 *             - Reembolsado
 *           example: Aprobado
 *         paidAt:
 *           type: string
 *           format: date-time
 *           example: '2025-01-15T10:30:00.000Z'
 */
export {};
