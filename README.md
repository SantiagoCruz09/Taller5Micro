# Taller 5: Microfrontends y Microservices en Angular y NodeJS

- Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) 20.3.14.
- El objetivo del taller es aplicar los conceptos de Microfrontends, Microservicios y arquitectura
  distribuida, mediante **3 Microfronts** independientes en Angular, **3 Microservicios** en Node.js y
  un **Host** que integra los Microfronts mediante Webpack Module Federation.

Puedes ver el paso a paso completo en [GUIA_TALLER.md](./GUIA_TALLER.md).

## Arquitectura

| Proyecto                        | Rol                            | Puerto | Clave                                         |
| ------------------------------- | ------------------------------ | ------ | --------------------------------------------- |
| Client-Host-Angular             | Host (navbar + router)         | 4200   | Carga los 3 remotes vía `loadRemoteModule`    |
| Microfrontend-Orders-Angular    | Microfront 1 (`mf-orders`)     | 4201   | Expone `./OrdersPage`                         |
| Microfrontend-Suppliers-Angular | Microfront 2 (`mf-suppliers`)  | 4202   | Expone `./SuppliersPage`                      |
| Microfrontend-Payments-Angular  | Microfront 3 (`mf-payments`)   | 4203   | Expone `./PaymentsPage`                       |
| Microservice-Orders-NodeJS      | Microservicio 1 (Orders)       | 3001   | `GET /api/orders/{countOrders}` + Swagger     |
| Microservice-Suppliers-NodeJS   | Microservicio 2 (Suppliers)    | 3002   | `GET /api/suppliers/{countSuppliers}` + Swagger |
| Microservice-Payments-NodeJS    | Microservicio 3 (Payments)     | 3003   | `GET /api/payments/{countPayments}` + Swagger |

Cada Microfront consume exclusivamente su Microservicio:

- Microfront Orders (4201) → Microservice Orders (3001)
- Microfront Suppliers (4202) → Microservice Suppliers (3002)
- Microfront Payments (4203) → Microservice Payments (3003)

## Requisitos previos

Antes de iniciar, asegúrate de tener instaladas las siguientes herramientas:

- Node.js
- npm
- Angular CLI
- Git
- Visual Studio Code

Puedes verificar Angular CLI en consola con: `ng version`

### 1. Instalar Dependencias

Ubícate en la raíz de cada proyecto y ejecuta `npm i`:

- `Client-Host-Angular`
- `Microfrontend-Orders-Angular`
- `Microfrontend-Suppliers-Angular`
- `Microfrontend-Payments-Angular`
- `Microservice-Orders-NodeJS`
- `Microservice-Suppliers-NodeJS`
- `Microservice-Payments-NodeJS`

### 2. Ejecutar los Proyectos

Primero los microservicios, luego los microfronts y por último el host
(en terminales separadas). En cada proyecto ejecuta: `npm run start`

1. `Microservice-Orders-NodeJS`
2. `Microservice-Suppliers-NodeJS`
3. `Microservice-Payments-NodeJS`
4. `Microfrontend-Orders-Angular`
5. `Microfrontend-Suppliers-Angular`
6. `Microfrontend-Payments-Angular`
7. `Client-Host-Angular`

> Nota: los microfronts deben estar arriba antes de navegar desde el Host,
> ya que el Host descarga cada `remoteEntry.js` en tiempo de ejecución.

### 3. Verificar Funcionamiento de Proyectos

#### Microservice-Orders-NodeJS

- Corriendo en: `http://localhost:3001`
- Swagger API Docs: `http://localhost:3001/api/docs`
- API Orders: `http://localhost:3001/api/orders/{countOrders}`

#### Microservice-Suppliers-NodeJS

- Corriendo en: `http://localhost:3002`
- Swagger API Docs: `http://localhost:3002/api/docs`
- API Suppliers: `http://localhost:3002/api/suppliers/{countSuppliers}`

#### Microservice-Payments-NodeJS

- Corriendo en: `http://localhost:3003`
- Swagger API Docs: `http://localhost:3003/api/docs`
- API Payments: `http://localhost:3003/api/payments/{countPayments}`

#### Microfrontend-Orders-Angular

- Corriendo en: `http://localhost:4201`
- RemoteEntry: `http://localhost:4201/remoteEntry.js`

#### Microfrontend-Suppliers-Angular

- Corriendo en: `http://localhost:4202`
- RemoteEntry: `http://localhost:4202/remoteEntry.js`

#### Microfrontend-Payments-Angular

- Corriendo en: `http://localhost:4203`
- RemoteEntry: `http://localhost:4203/remoteEntry.js`

#### Client-Host-Angular

- Corriendo en: `http://localhost:4200`
- Rutas: `/orders`, `/suppliers`, `/payments`

## Pruebas unitarias y cobertura

Cada microfront usa **Jest** (`jest-preset-angular`) con cobertura habilitada:

```bash
npm run test:coverage
```

| Proyecto                        | Suites | Tests | Cobertura |
| ------------------------------- | ------ | ----- | --------- |
| Client-Host-Angular             | 1      | 5     | 100%      |
| Microfrontend-Orders-Angular    | 5      | 23    | 100%      |
| Microfrontend-Suppliers-Angular | 5      | 23    | 100%      |
| Microfrontend-Payments-Angular  | 5      | 23    | 100%      |

## Documentación técnica

- **Compodoc** (Microfronts): `npm run compodoc` genera la documentación en
  la carpeta `documentation/` de cada microfront.
- **Swagger/OpenAPI** (Microservicios): disponible en `http://localhost:{puerto}/api/docs`.

## Control de versiones

El proyecto se gestiona con **Git** y está publicado en GitHub. Los commits
siguen el estándar de Conventional Commits: `feat`, `fix`, `refactor`, `docs`,
`test`, `chore`.
