import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Supplier, SupplierCategory } from '../../interfaces/suppliers.interface';

/**
 * Componente de tabla de proveedores.
 *
 * Se utiliza para mostrar un listado de proveedores en una tabla,
 * mostrando información como la empresa, el contacto, el correo,
 * el teléfono, el país y un badge visual que indica la categoría
 * de cada proveedor.
 *
 * @remarks
 * Este componente recibe los proveedores desde un componente padre
 * a través del Input `suppliers` y utiliza el mapeo `categoryMap`
 * para asignar colores a los badges según la categoría.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-suppliers-table [suppliers]="suppliersList"></app-suppliers-table>
 * ```
 */
@Component({
  selector: 'app-suppliers-table',
  templateUrl: './suppliers-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class SuppliersTableComponent {
  /**
   * Listado de proveedores que se mostrarán en la tabla.
   * @type {Supplier[]}
   * @remarks
   * Este Input permite pasar un array de proveedores desde un componente padre,
   * generalmente `SuppliersPage`. Cada proveedor debe cumplir la interfaz `Supplier`.
   */
  @Input() suppliers: Supplier[] = [];

  /**
   * Mapeo de categorías de proveedores a tipos de Badge.
   * @type {Record<SupplierCategory, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada categoría:
   * - 'Tecnologia' → 'primary' (azul)
   * - 'Alimentos' → 'success' (verde)
   * - 'Papeleria' → 'warning' (amarillo)
   * - 'Aseo' → 'info' (celeste)
   *
   * Esto permite que en la tabla cada proveedor tenga un badge visual que indique su categoría
   * de forma clara para el usuario.
   */
  categoryMap: Record<SupplierCategory, BadgeType> = {
    'Tecnologia': 'primary',
    'Alimentos': 'success',
    'Papeleria': 'warning',
    'Aseo': 'info',
  }
}
