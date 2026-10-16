/**
 * @openapi
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       description: Representa un proveedor del sistema
 *       required:
 *         - id
 *         - name
 *         - contactName
 *         - email
 *         - phone
 *         - country
 *         - category
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: TecnoAndina S.A.S
 *         contactName:
 *           type: string
 *           example: Carlos Ramírez
 *         email:
 *           type: string
 *           format: email
 *           example: carlos.ramirez@example.com
 *         phone:
 *           type: string
 *           example: '+57 300 123 4567'
 *         country:
 *           type: string
 *           example: Colombia
 *         category:
 *           type: string
 *           enum:
 *             - Tecnologia
 *             - Alimentos
 *             - Papeleria
 *             - Aseo
 *           example: Tecnologia
 */
export {};
