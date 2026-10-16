# Microfrontend Payments - Angular

Microfrontend encargado de la gestión de pagos. Consume el
microservicio `Microservice-Payments-NodeJS` y expone su página
`PaymentsPage` a través de Module Federation.

## Tecnologías

- Angular 20 (standalone components)
- Module Federation (@angular-architects)
- Jest + jest-preset-angular
- Bootstrap + Design System (@brejcha13320/design-system-bootstrap)
- Compodoc

## Instalación

```bash
npm i
```

## Ejecución

```bash
npm run start
```

El microfrontend se levanta en el puerto **4203** y expone el
`remoteEntry.js` en:

```
http://localhost:4203/remoteEntry.js
```

## Pruebas

```bash
npm run test
npm run test:coverage
```

## Documentación (Compodoc)

```bash
npm run compodoc
```

## Estructura

```
src/app/
├── components/
│   ├── alert/                # Alerta de estados de carga/error
│   └── payments-table/       # Tabla de pagos
├── interfaces/               # Payment, State
├── mocks/                    # PAYMENTS_MOCK
├── pages/payments/           # Página expuesta vía Module Federation
└── services/payments/        # Consumo de la API REST
```

## Requisitos

El microservicio `Microservice-Payments-NodeJS` debe estar corriendo
en `http://localhost:3003`. La página consume el endpoint
`http://localhost:3003/api/payments/{countPayments}`.
