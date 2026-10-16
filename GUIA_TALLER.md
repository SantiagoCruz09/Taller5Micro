# Guía del Taller 5 — Microfrontends y Microservicios

Guía paso a paso para desarrollar, integrar, probar y documentar el taller
usando el código base del repositorio.

---

## 1. Objetivo y alcance

Construir una arquitectura distribuida con:

- **3 Microfronts** independientes en Angular 20 (standalone components).
- **3 Microservicios** independientes en Node.js + TypeScript + Express 5.
- **1 Host** en Angular que integra los Microfronts con Webpack Module
  Federation y ofrece la navegación mediante un navbar.
- Comunicación **Microfront → Microservicio** exclusivamente por API REST.
- Datos simulados con **Faker.js**.
- Documentación con **Compodoc** (Microfronts) y **Swagger/OpenAPI** (Microservicios).
- Pruebas unitarias con **Jest** y cobertura **superior al 90%**.
- Control de versiones con **Git** y publicación en **GitHub**.

En el repositorio base ya existían 2 pares completos (Users y Products).
En esta iteración se agregó el tercer par (Orders), completando el taller.

---

## 2. Arquitectura y mapa de puertos

```
                          ┌──────────────────────────────┐
                          │   Client-Host-Angular :4200  │
                          │  Navbar: Usuarios | Productos│
                          │          | Pedidos           │
                          └──────┬──────────┬────────────┘
              loadRemoteModule   │          │   loadRemoteModule
                 (Module Fed.)   │          │
        ┌────────────────────────┘          └────────────────────────┐
        ▼                                                            ▼
┌───────────────────┐   HTTP GET   ┌───────────────────┐   HTTP GET   ┌───────────────────┐
│  MF Users  :4201  │ ───────────▶ │  MS Users  :3001  │   ┌─────────▶│  MS Products :3002│
│  ./UsersPage      │              │  /api/users/{n}   │   │          │ /api/products/{n} │
└───────────────────┘              └───────────────────┘   │          └───────────────────┘
┌───────────────────┐   HTTP GET                           │
│ MF Products :4202 │ ─────────────────────────────────────┘
│ ./ProductsPage    │
└───────────────────┘
┌───────────────────┐   HTTP GET   ┌───────────────────┐
│  MF Orders :4203  │ ───────────▶ │  MS Orders :3003  │
│  ./OrdersPage     │              │  /api/orders/{n}  │
└───────────────────┘              └───────────────────┘
```

| Proyecto                         | Rol                        | Puerto | Salida clave                          |
| -------------------------------- | -------------------------- | ------ | ------------------------------------- |
| `Client-Host-Angular`            | Host                       | 4200   | Rutas `/users`, `/products`, `/orders`|
| `Microfrontend-Users-Angular`    | Remote `mf-users`          | 4201   | `./UsersPage` + `remoteEntry.js`      |
| `Microfrontend-Products-Angular` | Remote `mf-products`       | 4202   | `./ProductsPage` + `remoteEntry.js`   |
| `Microfrontend-Orders-Angular`   | Remote `mf-orders`         | 4203   | `./OrdersPage` + `remoteEntry.js`     |
| `Microservice-Users-NodeJS`      | API REST + Swagger         | 3001   | `GET /api/users/{countUsers}`         |
| `Microservice-Products-NodeJS`   | API REST + Swagger         | 3002   | `GET /api/products/{countProducts}`   |
| `Microservice-Orders-NodeJS`     | API REST + Swagger         | 3003   | `GET /api/orders/{countOrders}`       |

Los Microfronts comparten dependencias de Angular mediante
`shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`
y exponen su página con el plugin de Module Federation.

---

## 3. Requisitos previos

- Node.js 20+ y npm
- Angular CLI 20 (`npm i -g @angular/cli@20.3.14`) — opcional, se puede usar `npx`
- Git
- Visual Studio Code

Verificación rápida:

```bash
node -v
npm -v
ng version
git --version
```

---

## 4. Instalación

Cada proyecto es **independiente** (no hay workspace raíz). Ejecuta `npm i`
dentro de cada carpeta:

```bash
# Microservicios
cd Microservice-Users-NodeJS    && npm i
cd Microservice-Products-NodeJS && npm i
cd Microservice-Orders-NodeJS   && npm i

# Microfronts
cd Microfrontend-Users-Angular    && npm i
cd Microfrontend-Products-Angular && npm i
cd Microfrontend-Orders-Angular   && npm i

# Host
cd Client-Host-Angular && npm i
```

---

## 5. Ejecución y verificación

Orden recomendado: **microservicios → microfronts → host**, cada uno en su
propia terminal con `npm run start`.

### Microservicios

| Proyecto                     | API                                  | Swagger                     |
| ---------------------------- | ------------------------------------ | --------------------------- |
| Microservice-Users-NodeJS    | `http://localhost:3001/api/users/5`  | `http://localhost:3001/api/docs` |
| Microservice-Products-NodeJS | `http://localhost:3002/api/products/5` | `http://localhost:3002/api/docs` |
| Microservice-Orders-NodeJS   | `http://localhost:3003/api/orders/5` | `http://localhost:3003/api/docs` |

Verificación con Navegador o curl:

```bash
curl http://localhost:3003/api/orders/3
```

### Microfronts (standalone)

- `http://localhost:4201` (Users), `http://localhost:4202` (Products), `http://localhost:4203` (Orders)
- Verifica que `http://localhost:4203/remoteEntry.js` responde (es el archivo
  que consume el Host).

### Host

- `http://localhost:4200` → navbar con **Usuarios**, **Productos** y **Pedidos**.

> Importante: si un microfront no está arriba, la ruta del Host que lo consume
> fallará al descargar su `remoteEntry.js`. Levántalos todos antes de probar.

---

## 6. Estructura de los proyectos

### Microservicio (Node.js + Express, arquitectura por capas)

```
Microservice-Orders-NodeJS/
├── .env                                  # PORT=3003, PUBLIC_PATH="public"
├── public/index.html                     # Página informativa del microservicio
├── src/
│   ├── app.ts                            # Punto de entrada (IIFE)
│   ├── config/
│   │   ├── envs.ts                       # Lectura/validación de variables de entorno
│   │   ├── swagger.ts                    # Configuración de swagger-jsdoc
│   │   └── swagger.schemas.ts            # Schemas OpenAPI (JSDoc @openapi)
│   ├── domain/
│   │   ├── erros/                        # CustomError + HandleError
│   │   └── interfaces/
│   │       ├── server.interface.ts       # Options del servidor
│   │       └── order.interface.ts        # Order + OrderStatus
│   └── presentation/
│       ├── server.ts                     # Middlewares, rutas, Swagger, SPA
│       ├── routes.ts                     # /api/orders -> OrdersRoutes
│       └── modules/orders/
│           ├── orders.routes.ts          # Ruta + documentación @openapi
│           ├── orders.controller.ts      # Manejo de Request/Response
│           └── orders.service.ts         # Generación con Faker.js
└── package.json                          # script start: tsnd --respawn src/app.ts
```

### Microfrontend (Angular standalone + Module Federation)

```
Microfrontend-Orders-Angular/
├── angular.json                          # builder ngx-build-plus + puerto 4203
├── webpack.config.js                     # name: mf-orders, expose ./OrdersPage
├── jest.config.js                        # preset jest-preset-angular
├── src/
│   ├── main.ts                           # import('./bootstrap') (requerido por MF)
│   ├── bootstrap.ts                      # bootstrapApplication(App, appConfig)
│   └── app/
│       ├── app.config.ts                 # provideRouter, provideHttpClient
│       ├── app.routes.ts                 # Ruta '' -> OrdersPage (standalone)
│       ├── components/
│       │   ├── alert/                    # Estado loading/error
│       │   └── orders-table/             # Tabla con badges por estado
│       ├── interfaces/                   # Order, OrderStatus, State
│       ├── mocks/                        # ORDERS_MOCK (datos de prueba)
│       ├── pages/orders/                 # OrdersPage (contenedor, se expone)
│       └── services/orders/              # Consumo de la API REST
```

---

## 7. Cómo se construyó el tercer par (Orders) — guía replicable

Esta sección permite replicar el proceso para cualquier dominio nuevo
(por ejemplo `Suppliers`, `Payments`, etc.).

### 7.1 Microservicio

1. **Crear la estructura** copiando un microservicio existente y ajustando:
   `.env` (nuevo puerto), `package.json` (`name`), `public/index.html`.

2. **Definir la interfaz del dominio** en
   `src/domain/interfaces/order.interface.ts` (tipado fuerte):

   ```ts
   export interface Order {
     id: number;
     customerName: string;
     customerEmail: string;
     product: string;
     quantity: number;
     total: number;
     status: OrderStatus;
     createdAt: string;
   }

   export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
   ```

3. **Implementar el servicio con Faker** en
   `src/presentation/modules/orders/orders.service.ts`:

   ```ts
   private generateOrder(id: number): Promise<Order> {
     const quantity = faker.number.int({ min: 1, max: 20 });
     const unitPrice = Number(faker.commerce.price({ min: 5000, max: 500000, dec: 0 }));

     return Promise.resolve({
       id,
       customerName: faker.person.fullName(),
       customerEmail: faker.internet.email(),
       product: faker.commerce.productName(),
       quantity,
       total: quantity * unitPrice,
       status: faker.helpers.arrayElement(this.statuses),
       createdAt: faker.date.past().toISOString(),
     });
   }
   ```

4. **Crear el controlador** `orders.controller.ts` (estado 200, latencia de
   1 segundo para evidenciar el estado `loading` del front y manejo de errores
   con `HandleError`).

5. **Registrar la ruta y documentarla** en `orders.routes.ts` con JSDoc
   `@openapi` (summary, parámetro de ruta, respuestas 200/400 y `$ref` al
   schema `Order`). Luego montarla en `src/presentation/routes.ts`:

   ```ts
   router.use("/api/orders", OrdersRoutes.routes);
   ```

6. **Documentar el schema** en `src/config/swagger.schemas.ts` y ajustar
   `src/config/swagger.ts` (título y `servers[0].url` con el puerto correcto).

7. **Verificar**:

   ```bash
   npm run start
   # http://localhost:3003/api/orders/5
   # http://localhost:3003/api/docs
   ```

### 7.2 Microfrontend

1. **Crear el proyecto** (ver `CREAR_MF.md`): `ng new` versión 20.3.14, sin
   SSR, sin zoneless, SCSS, y agregar Module Federation:

   ```bash
   npx -p @angular/cli@20.3.14 ng new Microfrontend-Test-Angular
   ng add @angular-architects/module-federation@20.0.0 --project Microfrontend-Test-Angular --port 4203
   ```

2. **Configurar** `angular.json` (puerto `4203`, `publicHost`, outputPath) y
   `webpack.config.js`:

   ```js
   module.exports = withModuleFederationPlugin({
     name: 'mf-orders',
     filename: "remoteEntry.js",
     exposes: {
       './OrdersPage': './src/app/pages/orders/orders.page.ts',
     },
     shared: {
       ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
     },
   });
   ```

3. **Replicar las capas** del patrón existente:
   - `interfaces/orders.interface.ts` (mismo contrato que el microservicio).
   - `services/orders/orders.service.ts` con `HttpClient`:

     ```ts
     getAllOrders(countOrders: number): Observable<Order[]> {
       return this.httpClient.get<Order[]>(`http://localhost:3003/api/orders/${countOrders}`);
     }
     ```

   - `mocks/orders.mocks.ts` con `ORDERS_MOCK` (2 registros fijos).
   - `components/orders-table` (presentación: tabla + badges según estado).
   - `components/alert` (reutilizado del patrón, estados loading/error).
   - `pages/orders/orders.page.ts` con máquina de estados
     `init → loading → success | error` y `@switch` en el template.

4. **Exponer la página** (`./OrdersPage` en `webpack.config.js`) y verificar
   `http://localhost:4203/remoteEntry.js`.

### 7.3 Integración con el Host

1. **Ruta federada** en `Client-Host-Angular/src/app/app.routes.ts`:

   ```ts
   {
     path: 'orders',
     loadComponent: () =>
       loadRemoteModule({
         type: 'module',
         remoteEntry: 'http://localhost:4203/remoteEntry.js',
         exposedModule: './OrdersPage',
       }).then(m => m.OrdersPage),
   },
   ```

2. **Navbar** en `Client-Host-Angular/src/app/app.ts`:

   ```ts
   navLinks: [
     { text: 'Usuarios', url: '/users' },
     { text: 'Productos', url: '/products' },
     { text: 'Pedidos', url: '/orders' },
   ]
   ```

3. **Actualizar el test** `app.spec.ts` que valida `navbarConfig` para que
   incluya el nuevo enlace (el test compara el objeto completo).

---

## 8. Pruebas unitarias y cobertura superior al 90%

### Comandos

```bash
npm test              # ejecuta Jest
npm run test:coverage # ejecuta Jest con reporte de cobertura
npm run test:watch    # modo watch
```

La configuración vive en `jest.config.js` (`collectCoverage: true`,
`testEnvironment: jsdom`, `preset: jest-preset-angular`) y `setup-jest.ts`.

### Estrategia de cobertura por archivo (microfronts)

| Archivo                          | Archivo de prueba                     | Técnica                                                    |
| -------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| `app.ts`                         | `app.spec.ts`                         | Creación + `router-outlet` presente                        |
| `pages/orders/orders.page.ts`    | `orders.page.spec.ts`                 | Servicio mockeado con `jest.spyOn` + `of/throwError`       |
| `services/orders/orders.service.ts` | `orders.service.spec.ts`           | `provideHttpClientTesting` + `HttpTestingController`       |
| `components/orders-table/*`      | `orders-table.component.spec.ts`      | Render por filas/columnas con `ORDERS_MOCK` y pipes        |
| `components/alert/*`             | `alert.component.spec.ts`             | Clases CSS por estado y render del texto                   |

### Resultados verificados en este repositorio

| Proyecto                        | Suites | Tests  | Cobertura (stmts/branch/func/lines) |
| ------------------------------- | ------ | ------ | ----------------------------------- |
| Client-Host-Angular             | 1      | 5      | 100 / 100 / 100 / 100               |
| Microfrontend-Users-Angular     | 5      | 23     | 100 / 100 / 100 / 100               |
| Microfrontend-Products-Angular  | 5      | 23     | 100 / 100 / 100 / 100               |
| Microfrontend-Orders-Angular    | 5      | 23     | 100 / 100 / 100 / 100               |

> Regla de oro con `HttpTestingController`: el `expectOne` debe usar la **URL
> absoluta** exacta que usa el servicio (ej.
> `http://localhost:3003/api/orders/5`).

---

## 9. Documentación con Compodoc (Microfronts)

```bash
npm run compodoc
```

- Genera la documentación en `documentation/` (ignorada por Git).
- Incluye componentes, servicios, interfaces, rutas y diagramas de dependencias.
- El comando usa `tsconfig.doc.json`, que excluye los archivos `*.spec.ts`.
- Ábrela con un servidor local, por ejemplo:

  ```bash
  npx http-server documentation -p 8080
  ```

---

## 10. Documentación con Swagger/OpenAPI (Microservicios)

- URL interactiva: `http://localhost:{puerto}/api/docs`.
- La especificación se construye con `swagger-jsdoc` a partir de:
  - Los comentarios `@openapi` de `src/presentation/modules/**/*.routes.ts`.
  - Los schemas de `src/config/swagger.schemas.ts`.
- Al crear un endpoint nuevo: añade su bloque `@openapi` **inmediatamente
  encima** del `router.get(...)` correspondiente y su schema con `$ref`.
- Verifica que `servers[0].url` en `src/config/swagger.ts` apunte al puerto
  real del microservicio.

---

## 11. Datos simulados con Faker.js

| Microservicio | Datos generados                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| Users         | `faker.person.firstName/lastName`, `faker.number.int`, `faker.internet.email`, ingeniería aleatoria |
| Products      | `faker.commerce.productName/price`, categoría aleatoria                          |
| Orders        | `faker.person.fullName`, `faker.internet.email`, `faker.commerce.productName`, cantidad, precio unitario, estado aleatorio, `faker.date.past()` |

Patrón general:

```ts
import { faker } from '@faker-js/faker';
// ...
status: faker.helpers.arrayElement(this.statuses),
```

---

## 12. Git y GitHub

### Convención de commits (obligatoria)

| Prefijo    | Uso                                        | Ejemplo                                                     |
| ---------- | ------------------------------------------ | ----------------------------------------------------------- |
| `feat`     | Nueva funcionalidad                        | `feat: se agrega microfrontend y microservicio de orders`   |
| `fix`      | Corrección de errores                      | `fix: se corrige la url absoluta en los specs de servicios` |
| `refactor` | Cambios internos sin alterar comportamiento| `refactor: se renombran las carpetas de los mfs`            |
| `docs`     | Documentación (README, guías, Compodoc)    | `docs: se agrega la guía del taller`                        |
| `test`     | Pruebas unitarias                          | `test: se agregan pruebas de la tabla de pedidos`           |
| `chore`    | Configuración, dependencias, tooling       | `chore: se actualizan dependencias de jest`                 |

### Flujo de trabajo sugerido

```bash
git checkout -b feat/microfrontend-orders   # rama por funcionalidad
git add Microfrontend-Orders-Angular Microservice-Orders-NodeJS
git commit -m "feat: se agrega el par orders (mf + ms)"
git push -u origin feat/microfrontend-orders
```

### Publicar en GitHub

```bash
git remote -v                                    # verifica el remoto
git push origin master                           # o tu rama de trabajo
# o crea un fork y abre un Pull Request
```

> El taller pide **un archivo PDF con el enlace del repositorio de GitHub**.
> Verifica que el repositorio sea público (o da acceso al docente).

---

## 13. Checklist de entrega

| Requisito del taller                                   | Dónde se cumple                                                        |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| Scaffolding completo de los proyectos                  | 7 proyectos con estructura por capas                                   |
| 3 Microfronts independientes en Angular                | `Microfrontend-Users`, `-Products`, `-Orders-Angular`                  |
| 3 Microservicios independientes en Node.js             | `Microservice-Users`, `-Products`, `-Orders-NodeJS`                    |
| Conexión MF ↔ MS por API REST                          | `services/*/*.service.ts` (4201→3001, 4202→3002, 4203→3003)            |
| Renderizado correcto de la información                 | Tablas con badges + estados loading/error                              |
| Interfaces y tipado fuerte                             | `interfaces/*.interface.ts` (MS y MF) + `strict: true`                 |
| Funcionamiento sin errores en consola                  | Verificado con tests y e2e (`tsc --noEmit`, API y Swagger 200)         |
| Documentación de Microfronts con Compodoc              | `npm run compodoc` → `documentation/`                                  |
| Documentación de APIs con Swagger                      | `/api/docs` en cada microservicio                                      |
| Cobertura de pruebas > 90%                             | 100% en los tres microfronts y el host                                 |
| Datos simulados con Faker.js                           | `*.service.ts` de cada microservicio                                   |
| README.md con instrucciones                            | `README.md` raíz + README por proyecto                                 |
| Git y GitHub                                           | Historial con Conventional Commits                                     |
| Commits estándar (feat, fix, refactor, docs, test, chore) | Sección 12 de esta guía                                             |
| Entrega de PDF con enlace al repositorio               | Paso final (ver sección 12)                                            |

---

## 14. Errores comunes y soluciones

1. **`Expected one matching request... found none` en specs de servicios**:
   `HttpTestingController.expectOne()` compara la URL exacta. Usa la URL
   absoluta completa que solicita el servicio.

2. **Swagger muestra el servidor equivocado**: revisa `servers[0].url` en
   `src/config/swagger.ts` de cada microservicio (Users → 3001, Products →
   3002, Orders → 3003).

3. **GET responde 201 (Created)**: un GET debe responder **200**. Se corrigió
   `res.status(201)` → `res.status(200)` en los controladores.

4. **El Host no carga un microfront**: verifica que el microfront esté
   levantado y que `remoteEntry.js` responda; revisa que `publicHost` en
   `angular.json` y la URL del Host apunten al mismo puerto (4201/4202/4203).

5. **Test del navbar del Host falla al agregar un enlace**: `app.spec.ts`
   compara el objeto `navbarConfig` completo; actualízalo al agregar enlaces.

6. **Título/selector copiados de otro proyecto** (p. ej. `<title>Microfrontend
   Users</title>` en Products o `selector: 'app-producs'`): revisa estos
   detalles al copiar proyectos.

7. **Faker devuelve `undefined` en campos**: verifica el método de la versión
   instalada (`@faker-js/faker` v10). Ej.: `faker.date.past()` en lugar de
   `faker.date.recent()` con firma antigua.

8. **`ng test` no funciona**: los proyectos usan **Jest**, no Karma. Ejecuta
   `npm test` (no existe target `test` en `angular.json`).

---

## 15. Entrega final

1. Ejecuta todas las verificaciones: `npm test` (4 proyectos Angular), arranque
   de los 3 microservicios y navegación completa en el Host.
2. Genera los reportes de cobertura y, si deseas, la documentación Compodoc.
3. Haz commit y push con mensajes bajo el estándar definido.
4. Genera un PDF con el enlace del repositorio de GitHub y entrégalo.
