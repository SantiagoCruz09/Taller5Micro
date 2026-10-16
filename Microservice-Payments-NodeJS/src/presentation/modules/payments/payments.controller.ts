import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { PaymentsService } from "./payments.service";

/**
 * Controlador de pagos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con pagos,
 * delegando la lógica de negocio al `PaymentsService`.
 */
export class PaymentsController {

  /**
   * Servicio de pagos.
   */
  private readonly paymentsService = new PaymentsService();

  /**
   * Maneja la petición HTTP para obtener un listado de pagos.
   *
   * @remarks
   * El número de pagos a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /payments/10
   * ```
   */
  getAllPayments = (req: Request, res: Response): void => {
    const { countPayments } = req.params;

    setTimeout(() => {
      this.paymentsService
        .getAllPayments(Number(countPayments))
        .then((payments) => res.status(200).json(payments))
        .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}
