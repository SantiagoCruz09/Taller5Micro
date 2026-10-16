/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       description: Representa un pedido del sistema
 *       required:
 *         - id
 *         - customerName
 *         - customerEmail
 *         - product
 *         - quantity
 *         - total
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         customerName:
 *           type: string
 *           example: Carlos Ramírez
 *         customerEmail:
 *           type: string
 *           format: email
 *           example: carlos.ramirez@example.com
 *         product:
 *           type: string
 *           example: Leche entera
 *         quantity:
 *           type: number
 *           example: 3
 *         total:
 *           type: number
 *           example: 13500
 *         status:
 *           type: string
 *           enum:
 *             - Pendiente
 *             - Enviado
 *             - Entregado
 *             - Cancelado
 *           example: Pendiente
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2025-01-15T10:30:00.000Z'
 */
export {};
