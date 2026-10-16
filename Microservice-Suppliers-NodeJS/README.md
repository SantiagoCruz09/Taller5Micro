# Microservice Suppliers - NodeJS

Microservicio encargado de exponer la información de proveedores a
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
(`PORT=3002`) mediante `ts-node-dev`, con recarga automática.

## Endpoints

| Método | Endpoint                             | Descripción                            |
| ------ | ------------------------------------ | -------------------------------------- |
| GET    | /api/suppliers/{countSuppliers}      | Retorna N proveedores generados con Faker |
| GET    | /api/docs                            | Documentación Swagger UI               |

### Ejemplo

```bash
curl http://localhost:3002/api/suppliers/5
```

```json
[
  {
    "id": 1,
    "name": "TecnoAndina S.A.S",
    "contactName": "Carlos Ramírez",
    "email": "carlos.ramirez@example.com",
    "phone": "+57 300 123 4567",
    "country": "Colombia",
    "category": "Tecnologia"
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
    └── modules/suppliers/        # Rutas, controlador y servicio
```
