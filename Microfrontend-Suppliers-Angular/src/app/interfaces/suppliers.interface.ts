/**
 * Interfaz que representa un proveedor.
 *
 * Contiene la información básica necesaria para mostrar un proveedor
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada proveedor debe tener un `id` único, el nombre de la empresa,
 * los datos de contacto, el país y una categoría válida.
 *
 * @example
 * ```ts
 * const proveedor: Supplier = {
 *   id: 1,
 *   name: 'TecnoAndina S.A.S',
 *   contactName: 'Carlos Ramírez',
 *   email: 'carlos.ramirez@example.com',
 *   phone: '+57 300 123 4567',
 *   country: 'Colombia',
 *   category: 'Tecnologia'
 * };
 * ```
 */
export interface Supplier {
    /** Identificador único del proveedor */
    id: number;

    /** Nombre o razón social de la empresa proveedora */
    name: string;

    /** Nombre de la persona de contacto */
    contactName: string;

    /** Correo electrónico de contacto */
    email: string;

    /** Número telefónico de contacto */
    phone: string;

    /** País donde opera el proveedor */
    country: string;

    /** Categoría del suministro del proveedor */
    category: SupplierCategory;
}

/**
 * Tipo de categoría de proveedor.
 *
 * @remarks
 * Este tipo restringe las categorías a los valores predefinidos:
 * - 'Tecnologia'
 * - 'Alimentos'
 * - 'Papeleria'
 * - 'Aseo'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const categoria: SupplierCategory = 'Alimentos';
 * ```
 */
export type SupplierCategory = 'Tecnologia' | 'Alimentos' | 'Papeleria' | 'Aseo';
