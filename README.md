# Fundamentos de JavaScript (versión 2)

Segunda versión de los ejercicios de **fundamentos de desarrollo web**: estructura de una
página con React, estilos con CSS y **consumo de una API con `fetch`**.

> 🌐 **En vivo:** <https://macaqui.github.io/fundamentos-js-2/>

## Contenido

```
css07102026/     # tarjeta personal (React vía CDN + Babel + CSS)
css21102026/     # galería "Mi mejor deseo" que consume una API local
└── server/      # pequeño servidor Express que expone GET /items
```

### `css21102026/` — Galería con API

Página que pide datos a un servidor local con `fetch("http://localhost:3000/items")`
y muestra una imagen según la respuesta. Si el servidor no está encendido, muestra la
primera imagen por defecto (el error se controla con `.catch`).

## Mejoras respecto a la versión 1

Esta versión es la **iteración mejorada** del mismo ejercicio. Los cambios están en
`css21102026/`:

| Mejora | Antes | Ahora |
| --- | --- | --- |
| **Manejo de errores** | El error solo se imprimía en la consola | Se muestra un **mensaje visible** al usuario con `role="alert"` |
| **Estado de carga** | No existía | Indicador *"Cargando datos de la API..."* mientras llega la respuesta |
| **Validación de la respuesta** | Se asumía que la API siempre responde bien | Se comprueba `res.ok` y que `data` sea un arreglo antes de usarlo |
| **Accesibilidad** | Botones sin etiquetas | `aria-label`, `aria-pressed` y botón activo resaltado |
| **Evitar fugas** | El `useEffect` no limpiaba | Bandera `activo` que ignora la respuesta si el componente se desmontó |
| **Responsive** | La imagen medía 600px fijos | Se adapta a pantallas pequeñas con `@media` |

## Cómo ejecutarlo

**1. Enciende el servidor de la API:**

```bash
cd css21102026/server
npm install
npm start          # -> http://localhost:3000/items
```

**2. Abre la página** en el navegador:

```bash
xdg-open css21102026/index.html
```

## Backend

El backend está en `server/` y usa Node.js, Express y Prisma con SQLite (un archivo
local, sin servidor de base de datos). Sirve las páginas del proyecto y expone una
API REST de deseos.

Para instalarlo y arrancarlo:

```bash
cd server
npm install
npx prisma db push   # crea la base de datos
npm start
```

Queda escuchando en <http://localhost:3005> y sirve las páginas del proyecto. Al
arrancar, si la tabla está vacía, inserta 3 deseos de ejemplo (imágenes 1, 2 y 3).
La galería se abre en <http://localhost:3005/css21102026/>.

Rutas de la API:

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/api/deseos` | Lista todos los deseos |
| GET | `/api/deseos/:id` | Devuelve un deseo por id |
| POST | `/api/deseos` | Crea un deseo (`nombre`, `imagen`) |
| PUT | `/api/deseos/:id` | Actualiza un deseo |
| DELETE | `/api/deseos/:id` | Elimina un deseo |
| GET | `/items` | Lista de ids que usa la galería |

La página `css21102026/index.html` consume esta API con `fetch` y rutas relativas
(`/items` y `/api/deseos`), así que funciona sin problemas de CORS porque el mismo
servidor sirve la página y la API.

## Conceptos practicados

- Manipulación del DOM y eventos.
- Componentes y estado en React (`useState`, `useEffect`).
- Peticiones HTTP con `fetch` y manejo de errores.
- Un servidor mínimo con **Express** y **CORS**.

## Créditos de imágenes

Las imágenes provienen de **Wikimedia Commons** y se usan bajo licencia
**CC BY-SA 2.0**:

- *Anime Expo 2013 — One Piece Cosplay*, por **William Tung**.
- *One Piece Cosplayer at Anime Expo 2009*, por **William Tung**.
- *Anime Expo 2010 — One Piece Cosplay*, por **Mark Ou**.

---

Proyecto desarrollado por **Samuel Hincapié**.

---

## Cómo abrirlo sin internet (desde la USB)

React y Babel están incluidos en `vendor/`, así que las páginas funcionan sin
conexión: abre cualquiera de estos archivos con doble clic.

| Página | Archivo | Qué muestra |
| --- | --- | --- |
| Tarjeta personal | `css07102026/index.html` | Tarjeta con la frase de Luffy y una imagen |
| Mi mejor deseo | `css21102026/index.html` | Galería con estado de carga y manejo de errores |

> La galería pide los datos a una API local (`server/`, puerto 3000). Si esa API
> no está encendida, en esta versión se muestra un aviso visible y la primera
> imagen (en la versión 1 la página quedaba sin mensaje).

## Despliegue en Render

El repositorio trae un archivo `render.yaml` para subirlo a [Render](https://render.com) como Blueprint.

1. Crea una cuenta en Render (puedes entrar con GitHub).
2. Pulsa "New" y luego "Blueprint".
3. Elige este repositorio y confirma.

Render lee el `render.yaml` y arma el servicio solo. Cuando termina, la página queda en
`https://fundamentos-js-2.onrender.com/` y ahí mismo funcionan la galería y la API.

En el plan gratis el disco es temporal: la base SQLite se crea de nuevo cada vez que el
servicio arranca, así que los datos que agregues desde la página se pierden al reiniciar
y vuelven los 3 datos de ejemplo. El servicio también se duerme tras 15 minutos sin
visitas y tarda unos segundos en despertar.
