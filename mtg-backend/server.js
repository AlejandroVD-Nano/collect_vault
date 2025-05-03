const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mtg_collection', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Modelo de Carta
const Card = mongoose.model('Card', new mongoose.Schema({
  id: String,
  nombre: String,
  nombreEnglish: String,
  cantidad: Number,
  ubicacion: String,
  precio: String,
  imagen: String,
  createdAt: { type: Date, default: Date.now }
}));

app.use(cors());
app.use(express.json());

// Rutas
app.get('/api/cards', async (req, res) => {
  const cards = await Card.find().sort({ createdAt: -1 });
  res.json(cards);
});

app.post('/api/cards', async (req, res) => {
  const card = new Card(req.body);
  await card.save();
  res.status(201).json(card);
});

app.put('/api/cards/:id', async (req, res) => {
  const card = await Card.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  res.json(card);
});

app.delete('/api/cards/:id', async (req, res) => {
  await Card.findOneAndDelete({ id: req.params.id });
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});