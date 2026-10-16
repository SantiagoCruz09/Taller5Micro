import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { SuppliersService } from "./suppliers.service";

/**
 * Controlador de proveedores.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con proveedores,
 * delegando la lógica de negocio al `SuppliersService`.
 */
export class SuppliersController {

  /**
   * Servicio de proveedores.
   */
  private readonly suppliersService = new SuppliersService();

  /**
   * Maneja la petición HTTP para obtener un listado de proveedores.
   *
   * @remarks
   * El número de proveedores a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /suppliers/10
   * ```
   */
  getAllSuppliers = (req: Request, res: Response): void => {
    const { countSuppliers } = req.params;

    setTimeout(() => {
      this.suppliersService
        .getAllSuppliers(Number(countSuppliers))
        .then((suppliers) => res.status(200).json(suppliers))
        .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}
