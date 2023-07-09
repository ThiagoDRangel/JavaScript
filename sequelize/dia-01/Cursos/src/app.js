const express = require('express');
const { Course } = require('./models');

const app = express();

app.use(express.json());

// Rota GET para obter todos os cursos
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Erro ao obter cursos:', error);
    return res.status(500).json({ error: 'Erro ao obter cursos' });
  }
});

app.post('/courses', async (req, res) => {
  const { name, description, active, duration } = req.body;
  const creationDate = new Date();
  await Course.create({ name, description, active, duration, creationDate });

  return res.status(201).json(datas);
});

module.exports = app;