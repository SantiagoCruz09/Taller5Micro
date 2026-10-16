import { Component, inject } from '@angular/core';
import { PaymentsTableComponent } from '../../components/payments-table/payments-table.component';
import { Payment } from '../../interfaces/payments.interface';
import { PaymentsService } from '../../services/payments/payments.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de pagos.
 *
 * Se utiliza para gestionar y mostrar un listado de pagos
 * utilizando el componente `PaymentsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `PaymentsService`
 * para obtener los pagos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-payments',
  templateUrl: `./payments.page.html`,
  imports: [PaymentsTableComponent, AlertComponent]
})
export class PaymentsPage {
  /**
   * Listado de pagos obtenidos desde el servicio.
   * @type {Payment[]}
   */
  payments: Payment[] = [];

  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener pagos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private paymentsService = inject(PaymentsService);

  /**
   * Inicializa el componente y carga los pagos.
   * @remarks
   * Se suscribe al método `getAllPayments()` del servicio y
   * asigna los datos recibidos a la propiedad `payments`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.paymentsService.getAllPayments(10).subscribe({
      next: (payments) => {
        this.payments = payments;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
