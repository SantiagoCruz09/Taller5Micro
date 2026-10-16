import { Supplier } from "../interfaces/suppliers.interface";

export const SUPPLIERS_MOCK: Supplier[] = [
    {
        id: 1,
        name: 'TecnoAndina S.A.S',
        contactName: 'Carlos Ramírez',
        email: 'carlos.ramirez@example.com',
        phone: '+57 300 123 4567',
        country: 'Colombia',
        category: 'Tecnologia',
    },
    {
        id: 2,
        name: 'Distribuidora El Campo',
        contactName: 'Ana Gómez',
        email: 'ana.gomez@example.com',
        phone: '+57 310 987 6543',
        country: 'México',
        category: 'Alimentos',
    }
];
