# Microfrontend Suppliers - Angular

Microfrontend encargado de la gestión de proveedores. Consume el
microservicio `Microservice-Suppliers-NodeJS` y expone su página
`SuppliersPage` a través de Module Federation.

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

El microfrontend se levanta en el puerto **4202** y expone el
`remoteEntry.js` en:

```
http://localhost:4202/remoteEntry.js
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
│   └── suppliers-table/      # Tabla de proveedores
├── interfaces/               # Supplier, State
├── mocks/                    # SUPPLIERS_MOCK
├── pages/suppliers/          # Página expuesta vía Module Federation
└── services/suppliers/       # Consumo de la API REST
```

## Requisitos

El microservicio `Microservice-Suppliers-NodeJS` debe estar corriendo
en `http://localhost:3002`. La página consume el endpoint
`http://localhost:3002/api/suppliers/{countSuppliers}`.
