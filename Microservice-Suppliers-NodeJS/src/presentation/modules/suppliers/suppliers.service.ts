import { faker } from '@faker-js/faker';
import { Supplier, SupplierCategory } from '../../../domain/interfaces/supplier.interface';

/**
 * Servicio encargado de la generación y gestión de proveedores.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar proveedores
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class SuppliersService {

  /**
   * Categorías disponibles para los proveedores.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente una categoría
   * a cada proveedor generado.
   */
  private categories: SupplierCategory[] = [
    'Tecnologia',
    'Alimentos',
    'Papeleria',
    'Aseo'
  ];

  /**
   * Obtiene un listado de proveedores generados dinámicamente.
   *
   * @param countSuppliers Cantidad de proveedores a generar
   * @returns Promesa que resuelve un arreglo de proveedores
   *
   * @example
   * ```ts
   * const suppliers = await suppliersService.getAllSuppliers(10);
   * ```
   */
  public async getAllSuppliers(countSuppliers: number): Promise<Supplier[]> {
    const suppliers: Promise<Supplier>[] = [];

    for (let i = 1; i <= countSuppliers; i++) {
      suppliers.push(this.generateSupplier(i));
    }

    return Promise.all(suppliers);
  }

  /**
   * Genera un proveedor ficticio.
   *
   * @param id Identificador único del proveedor
   * @returns Promesa que resuelve un proveedor generado
   */
  private generateSupplier(id: number): Promise<Supplier> {
    return Promise.resolve({
      id,
      name: faker.company.name(),
      contactName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      country: faker.location.country(),
      category: faker.helpers.arrayElement(this.categories),
    });
  }
}
