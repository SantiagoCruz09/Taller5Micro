import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../interfaces/suppliers.interface';

/**
 * Servicio encargado de la gestión de proveedores.
 *
 * Proporciona métodos para obtener información de proveedores
 * desde la API REST.
 *
 * @example
 * ```ts
 * constructor(private suppliersService: SuppliersService) {}
 *
 * this.suppliersService.getAllSuppliers(10).subscribe(suppliers => {
 *   console.log(suppliers);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SuppliersService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de proveedores desde el backend.
   *
   * @param countSuppliers Número de proveedores a obtener.
   * @returns Observable que emite un array de proveedores.
   *
   * @example
   * ```ts
   * this.suppliersService.getAllSuppliers(5).subscribe(suppliers => {
   *   console.log(suppliers);
   * });
   * ```
   */
  getAllSuppliers(countSuppliers: number): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(`http://localhost:3002/api/suppliers/${countSuppliers}`);
  }
}
