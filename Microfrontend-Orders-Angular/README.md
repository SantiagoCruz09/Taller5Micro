# Microfrontend Orders - Angular

Microfrontend encargado de mostrar el listado de pedidos. Consume la
API REST expuesta por `Microservice-Orders-NodeJS`
(`http://localhost:3001/api/orders/{countOrders}`) y expone su página
como módulo federado (`./OrdersPage`) para el Host.

## Tecnologías

- Angular 20.3.14 (standalone components)
- Webpack Module Federation (`@angular-architects/module-federation`)
- Jest + jest-preset-angular (pruebas unitarias y cobertura)
- Compodoc (documentación técnica)
- Bootstrap 5 + design system `@brejcha13320/design-system-bootstrap`

## Instalación

```bash
npm i
```

## Ejecución

```bash
npm run start
```

- Aplicación standalone: `http://localhost:4201`
- RemoteEntry (Module Federation): `http://localhost:4201/remoteEntry.js`

## Scripts

| Script                   | Descripción                                   |
| ------------------------ | --------------------------------------------- |
| `npm run start`          | Levanta el microfrontend en el puerto 4201    |
| `npm run build`          | Compila el proyecto                           |
| `npm run test`           | Ejecuta pruebas unitarias con Jest            |
| `npm run test:coverage`  | Ejecuta pruebas generando reporte de cobertura |
| `npm run compodoc`       | Genera la documentación técnica en `/documentation` |

## Estructura

```
src/app/
├── components/
│   ├── alert/                # Alerta de carga/error
│   └── orders-table/         # Tabla de pedidos (badges por estado)
├── interfaces/               # Order, OrderStatus, State
├── mocks/                    # Datos de prueba (ORDERS_MOCK)
├── pages/orders/             # Página contenedora (expuesta al Host)
└── services/orders/          # Consumo de la API REST
```
