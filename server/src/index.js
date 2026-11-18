const path = require('path');
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Lee el .env; si no existe, usa la base de datos local por defecto
try {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
} catch (e) {
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';
}

const prisma = new PrismaClient();
const app = express();
const PUERTO = process.env.PORT || 3005;
const RAIZ = path.join(__dirname, '..', '..');

app.use(cors());
app.use(express.json());

// Bloquea la carpeta server y los archivos ocultos
app.use((req, res, next) => {
  const partes = req.path.split('/');
  if (req.path.startsWith('/server') || partes.some((p) => p.startsWith('.'))) {
    return res.status(403).send('Acceso prohibido');
  }
  next();
});

app.use(express.static(RAIZ));

app.get('/api/deseos', async (req, res) => {
  const deseos = await prisma.deseo.findMany();
  res.json(deseos);
});

app.get('/api/deseos/:id', async (req, res) => {
  const deseo = await prisma.deseo.findUnique({ where: { id: Number(req.params.id) } });
  if (!deseo) return res.status(404).json({ error: 'No existe' });
  res.json(deseo);
});

app.post('/api/deseos', async (req, res) => {
  const deseo = await prisma.deseo.create({
    data: { nombre: req.body.nombre, imagen: req.body.imagen },
  });
  res.status(201).json(deseo);
});

app.put('/api/deseos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existe = await prisma.deseo.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: 'No existe' });
  const deseo = await prisma.deseo.update({
    where: { id },
    data: { nombre: req.body.nombre, imagen: req.body.imagen },
  });
  res.json(deseo);
});

app.delete('/api/deseos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existe = await prisma.deseo.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: 'No existe' });
  await prisma.deseo.delete({ where: { id } });
  res.json({ ok: true });
});

app.get('/items', async (req, res) => {
  const deseos = await prisma.deseo.findMany();
  res.json({ ms: 'mensaje de prueba', data: deseos.map((d) => d.id) });
});

async function iniciar() {
  const total = await prisma.deseo.count();
  if (total === 0) {
    await prisma.deseo.createMany({
      data: [
        { nombre: 'Deseo 1', imagen: '1' },
        { nombre: 'Deseo 2', imagen: '2' },
        { nombre: 'Deseo 3', imagen: '3' },
      ],
    });
  }
  app.listen(PUERTO, () => {
    console.log(`Servidor fundamentos-js-2 en http://localhost:${PUERTO}`);
    console.log('Base de datos lista (Prisma + SQLite)');
  });
}

iniciar();
