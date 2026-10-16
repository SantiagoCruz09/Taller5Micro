import { Router } from "express";
import { SuppliersController } from "./suppliers.controller";

export class SuppliersRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SuppliersController();

    /**
     * @openapi
     * /api/suppliers/{countSuppliers}:
     *   get:
     *     summary: Obtener listado de proveedores
     *     description: Retorna una lista de proveedores generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Suppliers
     *     parameters:
     *       - in: path
     *         name: countSuppliers
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de proveedores a generar
     *     responses:
     *       200:
     *         description: Lista de proveedores generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Supplier'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countSuppliers", controller.getAllSuppliers);

    return router;
  }
}
