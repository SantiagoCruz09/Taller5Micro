Taller 5: Microfrontends y Microservicios con Angular y Node.js

Proyecto generado con Angular CLI 20.3.14.

La idea del taller es aplicar microfrontends, microservicios y arquitectura distribuida. Para eso se armaron tres microfronts independientes en Angular, tres microservicios en Node.js y un host que une los microfronts usando Webpack Module Federation.

Arquitectura

El host (puerto 4200) tiene el navbar y el router, y carga los tres remotes con loadRemoteModule. Cada microfront expone una página y consume únicamente su propio microservicio.

Proyecto	Puerto	Qué hace
Client-Host-Angular	4200	Host, carga los remotes
Microfrontend-Orders-Angular	4201	Remote mf-orders, expone ./OrdersPage
Microfrontend-Suppliers-Angular	4202	Remote mf-suppliers, expone ./SuppliersPage
Microfrontend-Payments-Angular	4203	Remote mf-payments, expone ./PaymentsPage
Microservice-Orders-NodeJS	3001	GET /api/orders/{countOrders}
Microservice-Suppliers-NodeJS	3002	GET /api/suppliers/{countSuppliers}
Microservice-Payments-NodeJS	3003	GET /api/payments/{countPayments}

Los tres microservicios tienen documentación Swagger.

La relación entre cada microfront y su microservicio es:

Orders: 4201 consume 3001
Suppliers: 4202 consume 3002
Payments: 4203 consume 3003
Requisitos

Necesitas tener instalado Node.js, npm, Angular CLI, Git y Visual Studio Code. Para comprobar que Angular CLI quedó bien instalado:

bash
ng version
Instalación

Entra a la raíz de cada uno de los siete proyectos y ejecuta npm i:

Client-Host-Angular
Microfrontend-Orders-Angular
Microfrontend-Suppliers-Angular
Microfrontend-Payments-Angular
Microservice-Orders-NodeJS
Microservice-Suppliers-NodeJS
Microservice-Payments-NodeJS
Ejecución

El orden importa: primero los microservicios, después los microfronts y al final el host. Cada uno va en su propia terminal y se levanta con:

bash
npm run start

Orden sugerido:

Microservice-Orders-NodeJS
Microservice-Suppliers-NodeJS
Microservice-Payments-NodeJS
Microfrontend-Orders-Angular
Microfrontend-Suppliers-Angular
Microfrontend-Payments-Angular
Client-Host-Angular

Ojo: los microfronts tienen que estar corriendo antes de navegar desde el host, porque este descarga el remoteEntry.js de cada uno en tiempo de ejecución.

Verificar que todo funciona

Microservicios:

Orders: http://localhost:3001 (Swagger en /api/docs, API en /api/orders/{countOrders})
Suppliers: http://localhost:3002 (Swagger en /api/docs, API en /api/suppliers/{countSuppliers})
Payments: http://localhost:3003 (Swagger en /api/docs, API en /api/payments/{countPayments})

Microfronts:

Orders: http://localhost:4201, con el remoteEntry en http://localhost:4201/remoteEntry.js
Suppliers: http://localhost:4202, con el remoteEntry en http://localhost:4202/remoteEntry.js
Payments: http://localhost:4203, con el remoteEntry en http://localhost:4203/remoteEntry.js

Host:

http://localhost:4200, con las rutas /orders, /suppliers y /payments
Pruebas unitarias

Los proyectos Angular usan Jest (jest-preset-angular) con cobertura activada. Para correrlas:

bash
npm run test:coverage

Resultados actuales:

Proyecto	Suites	Tests	Cobertura
Client-Host-Angular	1	5	100%
Microfrontend-Orders-Angular	5	23	100%
Microfrontend-Suppliers-Angular	5	23	100%
Microfrontend-Payments-Angular	5	23	100%
Documentación técnica

Los microfronts se documentan con Compodoc. Al ejecutar npm run compodoc se genera la carpeta documentation/ dentro de cada uno.

Los microservicios se documentan con Swagger/OpenAPI, accesible en http://localhost:{puerto}/api/docs.

Control de versiones

El proyecto se maneja con Git y está publicado en GitHub. Los commits siguen Conventional Commits (feat, fix, refactor, docs, test, chore).