# Microservice Payments - NodeJS

Microservicio encargado de exponer la información de pagos a
través de una API REST. Los datos son generados dinámicamente con
[Faker.js](https://fakerjs.dev/) y documentados con Swagger/OpenAPI.

## Tecnologías

- Node.js + TypeScript
- Express 5
- Faker.js
- Swagger (swagger-jsdoc + swagger-ui-express)
- env-var + dotenv

## Instalación

```bash
npm i
```

## Ejecución

```bash
npm run start
```

El servidor se levanta en el puerto definido en `.env`
(`PORT=3003`) mediante `ts-node-dev`, con recarga automática.

## Endpoints

| Método | Endpoint                        | Descripción                        |
| ------ | ------------------------------- | ---------------------------------- |
| GET    | /api/payments/{countPayments}   | Retorna N pagos generados con Faker |
| GET    | /api/docs                       | Documentación Swagger UI           |

### Ejemplo

```bash
curl http://localhost:3003/api/payments/5
```

```json
[
  {
    "id": 1,
    "orderId": 12,
    "customerName": "Carlos Ramírez",
    "amount": 13500,
    "method": "Tarjeta",
    "status": "Aprobado",
    "paidAt": "2025-01-15T10:30:00.000Z"
  }
]
```

## Estructura

```
src/
├── app.ts                        # Punto de entrada
├── config/                       # Variables de entorno y Swagger
├── domain/                       # Interfaces y manejo de errores
└── presentation/
    ├── server.ts                 # Configuración de Express
    ├── routes.ts                 # Rutas principales
    └── modules/payments/         # Rutas, controlador y servicio
```
