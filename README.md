# Fundamentos de JavaScript (versión 2)

Segunda versión de los ejercicios de **fundamentos de desarrollo web**: estructura de una
página con React, estilos con CSS y **consumo de una API con `fetch`**.

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
