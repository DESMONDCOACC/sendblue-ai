const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  console.log('Mensaje recibido:', req.body);

  const from = req.body.from_number || req.body.number;
  const content = req.body.content || '';

  // Por ahora solo responde con un mensaje fijo
  // Después le pondremos la inteligencia artificial

  res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('El servidor de Mommy está funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});
