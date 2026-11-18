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
