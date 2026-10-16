# Microservice Orders - NodeJS

Microservicio encargado de exponer la información de pedidos a
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
(`PORT=3001`) mediante `ts-node-dev`, con recarga automática.

## Endpoints

| Método | Endpoint                        | Descripción                          |
| ------ | ------------------------------- | ------------------------------------ |
| GET    | /api/orders/{countOrders}       | Retorna N pedidos generados con Faker |
| GET    | /api/docs                       | Documentación Swagger UI             |

### Ejemplo

```bash
curl http://localhost:3001/api/orders/5
```

```json
[
  {
    "id": 1,
    "customerName": "Carlos Ramírez",
    "customerEmail": "carlos.ramirez@example.com",
    "product": "Leche entera",
    "quantity": 3,
    "total": 13500,
    "status": "Pendiente",
    "createdAt": "2025-01-15T10:30:00.000Z"
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
    └── modules/orders/           # Rutas, controlador y servicio
```
