import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPage } from './orders.page';
import { provideHttpClient } from '@angular/common/http';
import { OrdersService } from '../../services/orders/orders.service';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { of, throwError } from 'rxjs';
import { ORDERS_MOCK } from '../../mocks/orders.mocks';
import { By } from '@angular/platform-browser';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPage, OrdersTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllOrders al iniciar', () => {
    const spyGetAllOrders = jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllOrders).toHaveBeenCalled();
  });

  it('debería asignar los pedidos recibidos del servicio', () => {
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    expect(component.orders).toEqual(ORDERS_MOCK);
  });

  it('debería pasar los pedidos al componente orders-table', () => {
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(OrdersTableComponent))
      .componentInstance;
    expect(tableComponent.orders).toEqual(ORDERS_MOCK);
  });

  it('debería manejar el error cuando falla getAllOrders', () => {
    component.orders = [];
    const errorResponse = new Error('Error al cargar pedidos');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(ordersService.getAllOrders).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.orders.length).toBe(0);
  });
});
