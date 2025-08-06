# Proyecto Next.js - Sipel

Este es un proyecto [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Arquitectura de Carpetas

La estructura del proyecto es la siguiente:

```
_old/
.dockerignore
.env
.env.sample
.eslintrc.json
.gitignore
.next/
├── app-build-manifest.json
├── app-path-routes-manifest.json
├── ...
.prettierignore
.prettierrc
.prettierrc.old
.vscode/
├── ...
app.log
components.json
docker-compose.yml
Dockerfile
envConfig.ts
instrumentation.ts
next-env.d.ts
next.config.ts
nginx/
├── ...
package.json
pnpm-lock.yaml
postcss.config.mjs
prisma/
├── ...
public/
├── ...
README.md
src/
├── components/
│   ├── global/
│   │   ├── AutoRefreshCache.tsx
│   │   ├── ...
│   ├── ...
├── config/
│   ├── routes.config.ts
│   ├── ...
├── hooks/
│   ├── useAutoRefreshCache.ts
│   ├── ...
├── lib/
│   ├── cache.ts
│   ├── ...
├── styles/
│   ├── globals.css
│   ├── ...
├── app/
│   ├── core/
│   ├── (auth)/
│   ├── (main)/
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── Providers.tsx
│   ├── ...
tailwind.config.ts
tailwind.config.ts.old
tsconfig.json
vitest.config.ts
vitest.setup.ts
```

### Descripción de Carpetas y Archivos Principales

- `_old/`: Archivos antiguos o de respaldo.
- `.next/`: Archivos generados por Next.js durante la construcción y ejecución.
- `.vscode/`: Configuraciones específicas de Visual Studio Code.
- `nginx/`: Configuraciones de Nginx.
- `prisma/`: Archivos relacionados con Prisma ORM.
- `public/`: Archivos estáticos públicos.
- `src/`: Código fuente principal de la aplicación.
  - `components/`: Componentes reutilizables de la aplicación.
    - `global/`: Componentes globales como `AutoRefreshCache.tsx`.
  - `config/`: Archivos de configuración, como `routes.config.ts`.
  - `hooks/`: Custom hooks de React, como `useAutoRefreshCache.ts`.
  - `lib/`: Librerías y utilidades, como `cache.ts`.
  - `styles/`: Archivos de estilos globales y específicos, como `globals.css`.
  - `app/`: Archivos de la aplicación principal.
    - `core/`: Núcleo de la aplicación.
    - `(auth)/`: Módulo de autenticación.
    - `(main)/`: Módulo principal de la aplicación.
      - `{grupo}/`: Grupo de secciones.
        - `{seccion}/`: Sección específica relacionada con el grupo.
          -   {}
    - `layout.tsx`: Componente de layout principal.
    - `loading.tsx`: Componente de pantalla de carga.
    - `Providers.tsx`: Proveedores de contexto y estado generales.
- `Dockerfile`: Archivo de configuración para Docker.
- `package.json`: Archivo de configuración de dependencias y scripts de npm.
- `tsconfig.json`: Configuración de TypeScript.
- `README.md`: Documentación del proyecto.

## Diseño de la aplicación

Next js es un meta framework de react que simplifica y facilita algunos procesos en el desarrollo de aplicaciones web. Tiene un sistema de enrutado basado en sistema de archivos, la carpeta con nombre "x", generaria una ruta "/x" para la url. Dentro de una ruta se pueden poner archivos con nombres reservados para hacer paginas, rutas de api, layouts, pagina de carga con suspense boundaries, etc.
Gracias a app router se pueden utilizar server componets, componentes que solo se ejecutan en el servidor y prerenderizan html. Por lo tanto, no envían JS al cliente, lo que mejora la velocidad de carga de la página. Además los componentes pueden ser asincronos, lo que simplifica la carga de datos atraves de fetch.
Los client components tambien se prerenderizan en el servidor, pero se envia JS al cliente donde se realizara un proceso de hidratacion, donde se une el js dinamico con el html estatico que se haya podido prerenderizar, lo que permite mantener la interactividad con el usuario y poder usar eventos, hooks y APIs del navegador.
Next.js también hace uso de server actions, son utiles para simplificar logica en api routes. Next internamente hace un fetch POST a una api route de forma interna, pero en el codigo se utilizan como funciones asincronas normales.
En la carpeta raíz se incluyen los ficheros de configuración, y en /app los archivos que son comunes a todas las secciones, como el layout principal de la aplicacion y el archivo de providers. El punto de entrada de la aplicacion es app/layout.tsx. Ahi se cargan los estilos de la aplicacion y se reenderiza el children, que es la pagina raíz de la aplicación si hubiera, o los layouts y páginas de las carpetas hijas.
/app se divide en 3 grupos logicos principales (las carpetas con nombres entre parentesis sirven para agrupar pero no se aplican a las rutas): auth, main y hidden. auth es para la identificacion de usuario y main para las caracteristicas protegidas de la aplicacion, es decir, para usuarios que han iniciado sesion. Hidden es para probar cosas temporalmente y escaparate de componentes.
En esta aplicacion se implementa de forma ligera conceptos de clean architecture y DDD. Se divide en varias capas la logica pero no se realiza inyeccion de dependencias.
La capa de acceso a datos constituye las conexiones con la api externa del web service en el backend, que conecta con sap b1, en este punto se realiza el cacheo de la informacion haciendo uso de la caché de react y de next. Además, en este punto también se realiza la traducción entre estructuras del backend y el frontend usando funciones Adapter (Data Transfer Object). Luego tenemos en la capa de apliacion los casos de uso donde generalmente se ejecuta logica de dominio. Hasta aqui estas 2 capas son puro TS, es decir, no estan acopladas a la funcionalidad especifica de react y next js. Sobre la interactividad del usuario existen las server actions que son propias de next, en este caso funcionan como controladores tambien, a futuro seria interesante generar una capa de controlador propiamente dicha, para interactuar ahi con las cookies en vez de en la server actions, y poco a poco ir reduciendo su responsabilidad a meramente validar estructuras de zod y transmitir informacion a la siguiente capa.
En el caso del fetch de datos, se realiza siempre desde componentes de servidor, y desde ahí se transmiten los datos a los componentes de cliente, para evitar la exposicion de datos sensibles en el cliente (navegador o dispositivo). En este punto lo mejor sería aplicar a futuro un sistema de presenters donde se encuentre la logica de presentacion de los datos (cálculos, transformaciones regionales y reenderizado de texto), y se eviten cálculos complejos en los componentes.
La estructuración en carpetas se basa también en un patron llamado screaming architecture, donde los nombres de las carpetas y archivos son lo mas descriptivos posibles, para que se entienda la estructura de la aplicacion sin necesidad de abrir los archivos. /app se divide en las diferentes secciones que tiene la aplicación, y en cada carpeta de seccion se incluyen las carpetas \_core y \_components. En \_core se incluyen los archivos de la capa de aplicacion y acceso a datos, y en \_components se incluyen los componentes de la seccion. En \_core se suele encontrar:
- `{seccion}.services.ts`: Conexiones con los endpoints del WS
- `{seccion}.use-cases.ts`: Contiene la lógica de negocio relacionada con la sección
- `{seccion}.search-params.ts`: Manejo y definición de los parámetros de búsqueda
- `{seccion}.definitions.ts`: Definiciones de tipos e interfaces relevantes para la sección y funciones Adapter (se usan para transformar estructuras).
- `actions.ts`: Acciones de servidor de Next.js. Es un caso especial porque suelen encontrarse en la carpeta directa donde se utilizan.

## Dependencias

### Dependencias de Desarrollo

- `eslint`: Herramienta para análisis estático de código. Ayuda a mantener la calidad del código mediante la identificación de problemas en el código.
- `prettier`: Formateador de código. Asegura un formato de código consistente en todo el proyecto.
- `typescript`: Lenguaje de programación que extiende JavaScript. Proporciona tipado estático para mejorar la calidad del código y la productividad del desarrollador.
- `faker-js`: Biblioteca que facilita la creación de datos falsos para pruebas y desarrollo.
- `jsdom`: Implementación en JavaScript puro de muchos estándares web, notablemente los estándares WHATWG DOM y HTML, para su uso con Node.js. En general, el objetivo es emular una parte suficiente de un navegador web para ser útil en pruebas y extracción de datos de aplicaciones web del mundo real.
- `vitest`: Framework utilizado para escribir y ejecutar pruebas unitarias.
- `react-testing-library`: Solución ligera para testear componentes de React. Proporciona funciones de utilidad livianas sobre react-dom y react-dom/test-utils, de una manera que fomenta mejores prácticas de prueba. Su principio guía principal es: Cuanto más se asemejen tus pruebas a la forma en que se utiliza tu software, más confianza pueden darte.

### Dependencias Principales

- `react`: Biblioteca de JavaScript para construir interfaces de usuario. Utilizado para construir y renderizar componentes de la interfaz de usuario.
- `react-dom`: Paquete de React para manipulación del DOM. Utilizado para renderizar componentes de React en el DOM.
- `next`: Framework de React para aplicaciones web. Utilizado para la creación de aplicaciones web con funcionalidades avanzadas como SSR (Server-Side Rendering) y SSG (Static Site Generation).
- `node`: Entorno de ejecución de JavaScript. Utilizado para ejecutar código JavaScript en el servidor.
- `pnpm`: Gestor de paquetes. Utilizado para instalar y gestionar las dependencias del proyecto de forma eficiente.

### Dependencias Esenciales

- `iron-session`: Biblioteca para la gestión de sesiones a través de cookies cifradas. Facilita la gestión de sesiones en aplicaciones web.
- `zod`: Biblioteca para la validación de esquemas de datos en TypeScript. Facilita la validación de datos y la creación de esquemas de datos en TypeScript.
- `cookies-next`: Biblioteca para la gestión de cookies en Next.js, proporcionando una API simple y fácil de usar para la creación, lectura y eliminación de cookies en entorno de servidor y cliente.
- `nuqs`: Administrador de estado de parámetros de búsqueda con tipado estático para frameworks de React. Similar a useState, pero almacenado en la cadena de consulta de la URL. Facilita la gestión del estado de los parámetros de búsqueda.
- `react-hook-form`: Biblioteca para la gestión de formularios en React.
- `zsa`: Biblioteca para construir acciones de servidor con tipado estático en Next.js. Proporciona una experiencia de desarrollo simple y escalable con características como entradas/salidas validadas, procedimientos (middleware) para pasar contexto a acciones de servidor, e integración con React Query para consultar acciones de servidor en componentes del cliente.

### Dependencias de estilos y componentes

- `tailwindcss`: Framework de CSS para diseño. Proporciona utilidades CSS para un diseño rápido y eficiente.
- `radix`: Biblioteca de componentes accesibles y facilmente personalizables. Facilita la creación de componentes accesibles y altamente personalizables.
- `shadcn`: Biblioteca de componentes que proporciona una gran versatilidad y capacidad de personalización. Funciona sobre `radix` como `headless-ui`, lo que permite crear componentes accesibles y altamente personalizables. Permite crear componentes altamente personalizables y accesibles, lo que facilita el desarrollo de interfaces de usuario complejas y adaptables.
- `class-variance-authority`: Librería de JavaScript que permite definir y aplicar fácilmente variaciones de clases CSS a elementos HTML. CVA es especialmente útil para sistemas de diseño y para crear componentes con múltiples variantes de manera eficiente y tipada.
- `clsx`: Utilidad para la generación de clases CSS condicionales. Facilita la generación de clases CSS condicionales en componentes de React.
- `tailwind-merge`: Utilidad para la combinación de clases de Tailwind CSS. Facilita la combinación de clases de Tailwind CSS en componentes de React.
- `next-themes`: Biblioteca para la gestión de temas (claro/oscuro) en Next.js.
- `react-icons`: Biblioteca de iconos para React. Proporciona una amplia variedad de iconos listos para usar en aplicaciones React.
- `sonner`: Biblioteca para la creación de notificaciones en React.
- `cmdk`: Biblioteca para panel de comandos en React.

### Otras Dependencias

- `next-top-loader`: Barra de carga superior para mejorar la experiencia del usuario durante la navegación. Mejora la experiencia del usuario mostrando una barra de carga durante la navegación.
- `superjson`: Biblioteca para la serialización segura de expresiones JavaScript a un superconjunto de JSON, que incluye Dates, BigInts y más.
- `prisma`: ORM para bases de datos. Facilita la interacción con la base de datos mediante un ORM.
- `date-fns`: Biblioteca que facilita la manipulación y formateo de fechas en JavaScript.
- `use-debounce`: Hook para la creación de valores debounced, lo que permite retrasar la ejecución de una función hasta que haya pasado un cierto tiempo sin cambios.
- `@tanstack/react-table`: Biblioteca para la creación de tablas con funcionalidades avanzadas como paginación, filtrado y ordenación. Permite la creación de tablas con funcionalidades avanzadas, facilitando la presentación y manipulación de grandes conjuntos de datos.
- `dotenv`: Biblioteca para la carga de variables de entorno desde un archivo `.env`. (En next viene por defecto)
- `jose`: Biblioteca para la creación y verificación de tokens JWT en Node.js.
- `mysql2`: Driver de MySQL para Node.js.
- `react-day-picker`: Biblioteca para la selección de fechas en componentes de React.
- `@next/mdx`: Extensión de Next.js para la creación de páginas MDX. Markdown con soporte para JSX.
- `react-markdown`: Biblioteca para convertir Markdown en componentes de React.

### Dependencias a Futuro

- `zustand`: Biblioteca para la gestión de estados globales en React.
- `ts-to-zod`: Biblioteca para la conversión de tipos de TypeScript a esquemas de Zod.

#### Dependencias de Logs

- `next-logger`: Biblioteca para la simplificación de logs en Next.js.
- `pino`: Biblioteca para la generación de logs en Node.js.
- `winston`: Biblioteca para la generación de logs en Node.js.

### Dependencias en Desuso

-`xstate`: Biblioteca para la gestión de estados en React, la creación de máquinas de estados y la gestión de estados complejos en aplicaciones React.

- `@tanstack/react-query`: Biblioteca para la gestión de estados de datos asincrónicos en React. Simplifica la gestión de estados de datos asincrónicos, proporcionando herramientas para el manejo de caché, sincronización y actualización de datos.

FALTAN por apuntar date-fns, jose, mysql2, react-day-picker, mdx, react markdown

## Readme Next.js

### Comenzando

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

La aplicación se actualiza automáticamente a medida que editas el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para optimizar y cargar automáticamente Inter, una fuente personalizada de Google.

### Aprende Más

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - Aprende sobre las características y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - Un tutorial interactivo de Next.js.

Puedes revisar el [repositorio de Next.js en GitHub](https://github.com/vercel/next.js/) - tus comentarios y contribuciones son bienvenidos.

### Despliegue en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/deployment) para más detalles.
