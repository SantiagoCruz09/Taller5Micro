import { Component, inject } from '@angular/core';
import { SuppliersTableComponent } from '../../components/suppliers-table/suppliers-table.component';
import { Supplier } from '../../interfaces/suppliers.interface';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de proveedores.
 *
 * Se utiliza para gestionar y mostrar un listado de proveedores
 * utilizando el componente `SuppliersTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `SuppliersService`
 * para obtener los proveedores y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-suppliers',
  templateUrl: `./suppliers.page.html`,
  imports: [SuppliersTableComponent, AlertComponent]
})
export class SuppliersPage {
  /**
   * Listado de proveedores obtenidos desde el servicio.
   * @type {Supplier[]}
   */
  suppliers: Supplier[] = [];

  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener proveedores.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private suppliersService = inject(SuppliersService);

  /**
   * Inicializa el componente y carga los proveedores.
   * @remarks
   * Se suscribe al método `getAllSuppliers()` del servicio y
   * asigna los datos recibidos a la propiedad `suppliers`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.suppliersService.getAllSuppliers(10).subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
