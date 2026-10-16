import { Order } from "../interfaces/orders.interface";

export const ORDERS_MOCK: Order[] = [
    {
        id: 1,
        customerName: 'Carlos Ramírez',
        customerEmail: 'carlos.ramirez@example.com',
        product: 'Leche entera',
        quantity: 3,
        total: 13500,
        status: 'Pendiente',
        createdAt: '2025-01-15T10:30:00.000Z',
    },
    {
        id: 2,
        customerName: 'Ana Gómez',
        customerEmail: 'ana.gomez@example.com',
        product: 'Manzana roja',
        quantity: 5,
        total: 16000,
        status: 'Entregado',
        createdAt: '2025-02-02T08:00:00.000Z',
    }
];
