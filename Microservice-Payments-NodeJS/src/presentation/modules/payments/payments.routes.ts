import { Router } from "express";
import { PaymentsController } from "./payments.controller";

export class PaymentsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PaymentsController();

    /**
     * @openapi
     * /api/payments/{countPayments}:
     *   get:
     *     summary: Obtener listado de pagos
     *     description: Retorna una lista de pagos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Payments
     *     parameters:
     *       - in: path
     *         name: countPayments
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de pagos a generar
     *     responses:
     *       200:
     *         description: Lista de pagos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Payment'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countPayments", controller.getAllPayments);

    return router;
  }
}
