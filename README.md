# Taller 5: Microfrontends y Microservices en Angular y NodeJS

- Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) 20.3.14.
- El objetivo del taller es aplicar los conceptos de Microfrontends, Microservicios y arquitectura
  distribuida, mediante **3 Microfronts** independientes en Angular, **3 Microservicios** en Node.js y
  un **Host** que integra los Microfronts mediante Webpack Module Federation.

Puedes ver el paso a paso completo en [GUIA_TALLER.md](./GUIA_TALLER.md).

## Arquitectura

| Proyecto                     | Rol                          | Puerto | Clave                                            |
| ---------------------------- | ---------------------------- | ------ | ------------------------------------------------ |
| Client-Host-Angular          | Host (navbar + router)       | 4200   | Carga los 3 remotes vía `loadRemoteModule`       |
| Microfrontend-Users-Angular  | Microfront 1 (`mf-users`)    | 4201   | Expone `./UsersPage`                             |
| Microfrontend-Products-Angular | Microfront 2 (`mf-products`) | 4202 | Expone `./ProductsPage`                          |
| Microfrontend-Orders-Angular | Microfront 3 (`mf-orders`)   | 4203   | Expone `./OrdersPage`                            |
| Microservice-Users-NodeJS    | Microservicio 1 (Users)      | 3001   | `GET /api/users/{countUsers}` + Swagger          |
| Microservice-Products-NodeJS | Microservicio 2 (Products)   | 3002   | `GET /api/products/{countProducts}` + Swagger    |
| Microservice-Orders-NodeJS   | Microservicio 3 (Orders)     | 3003   | `GET /api/orders/{countOrders}` + Swagger        |

Cada Microfront consume exclusivamente su Microservicio:

- Microfront Users (4201) → Microservice Users (3001)
- Microfront Products (4202) → Microservice Products (3002)
- Microfront Orders (4203) → Microservice Orders (3003)

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
- `Microfrontend-Users-Angular`
- `Microfrontend-Products-Angular`
- `Microfrontend-Orders-Angular`
- `Microservice-Users-NodeJS`
- `Microservice-Products-NodeJS`
- `Microservice-Orders-NodeJS`

### 2. Ejecutar los Proyectos

Primero los microservicios, luego los microfronts y por último el host
(en terminales separadas). En cada proyecto ejecuta: `npm run start`

1. `Microservice-Users-NodeJS`
2. `Microservice-Products-NodeJS`
3. `Microservice-Orders-NodeJS`
4. `Microfrontend-Users-Angular`
5. `Microfrontend-Products-Angular`
6. `Microfrontend-Orders-Angular`
7. `Client-Host-Angular`

> Nota: los microfronts deben estar arriba antes de navegar desde el Host,
> ya que el Host descarga cada `remoteEntry.js` en tiempo de ejecución.

### 3. Verificar Funcionamiento de Proyectos

#### Microservice-Users-NodeJS

- Corriendo en: `http://localhost:3001`
- Swagger API Docs: `http://localhost:3001/api/docs`
- API Users: `http://localhost:3001/api/users/{countUsers}`

#### Microservice-Products-NodeJS

- Corriendo en: `http://localhost:3002`
- Swagger API Docs: `http://localhost:3002/api/docs`
- API Products: `http://localhost:3002/api/products/{countProducts}`

#### Microservice-Orders-NodeJS

- Corriendo en: `http://localhost:3003`
- Swagger API Docs: `http://localhost:3003/api/docs`
- API Orders: `http://localhost:3003/api/orders/{countOrders}`

#### Microfrontend-Users-Angular

- Corriendo en: `http://localhost:4201`
- RemoteEntry: `http://localhost:4201/remoteEntry.js`

#### Microfrontend-Products-Angular

- Corriendo en: `http://localhost:4202`
- RemoteEntry: `http://localhost:4202/remoteEntry.js`

#### Microfrontend-Orders-Angular

- Corriendo en: `http://localhost:4203`
- RemoteEntry: `http://localhost:4203/remoteEntry.js`

#### Client-Host-Angular

- Corriendo en: `http://localhost:4200`
- Rutas: `/users`, `/products`, `/orders`

## Pruebas unitarias y cobertura

Cada microfront usa **Jest** (`jest-preset-angular`) con cobertura habilitada:

```bash
npm run test:coverage
```

| Proyecto                      | Suites | Tests | Cobertura |
| ----------------------------- | ------ | ----- | --------- |
| Client-Host-Angular           | 1      | 5     | 100%      |
| Microfrontend-Users-Angular   | 5      | 23    | 100%      |
| Microfrontend-Products-Angular| 5      | 23    | 100%      |
| Microfrontend-Orders-Angular  | 5      | 23    | 100%      |

## Documentación técnica

- **Compodoc** (Microfronts): `npm run compodoc` genera la documentación en
  la carpeta `documentation/` de cada microfront.
- **Swagger/OpenAPI** (Microservicios): disponible en `http://localhost:{puerto}/api/docs`.

## Control de versiones

El proyecto se gestiona con **Git** y está publicado en GitHub. Los commits
siguen el estándar de Conventional Commits: `feat`, `fix`, `refactor`, `docs`,
`test`, `chore`.
