import { Routes } from '@angular/router';
import { SuppliersPage } from './pages/suppliers/suppliers.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link SuppliersPage}
 */
export const routes: Routes = [
  /**
   * Ruta de proveedores.
   *
   * @remarks
   * Renderiza el componente `SuppliersPage`, encargado
   * de mostrar y gestionar el listado de proveedores.
   */
  { path: '', loadComponent: () => import('./pages/suppliers/suppliers.page').then((m) => m.SuppliersPage)},
];
