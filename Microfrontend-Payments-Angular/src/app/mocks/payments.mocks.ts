import { Payment } from "../interfaces/payments.interface";

export const PAYMENTS_MOCK: Payment[] = [
    {
        id: 1,
        orderId: 12,
        customerName: 'Carlos Ramírez',
        amount: 13500,
        method: 'Tarjeta',
        status: 'Aprobado',
        paidAt: '2025-01-15T10:30:00.000Z',
    },
    {
        id: 2,
        orderId: 8,
        customerName: 'Ana Gómez',
        amount: 16000,
        method: 'PSE',
        status: 'Pendiente',
        paidAt: '2025-02-02T08:00:00.000Z',
    }
];
