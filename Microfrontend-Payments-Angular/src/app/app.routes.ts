import { Routes } from '@angular/router';
import { PaymentsPage } from './pages/payments/payments.page';

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
 * @see {@link PaymentsPage}
 */
export const routes: Routes = [
  /**
   * Ruta de pagos.
   *
   * @remarks
   * Renderiza el componente `PaymentsPage`, encargado
   * de mostrar y gestionar el listado de pagos.
   */
  { path: '', loadComponent: () => import('./pages/payments/payments.page').then((m) => m.PaymentsPage)},
];
