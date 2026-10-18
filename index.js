const express = require('express');
const axios = require('axios'); // Necesitaremos axios para hacer las peticiones a Sendblue
const app = express();
app.use(express.json());

// Estas son las credenciales que meterás en Render
const SENDBLUE_API_KEY = process.env.SENDBLUE_API_KEY;
const SENDBLUE_API_SECRET = process.env.SENDBLUE_API_SECRET;

app.post('/webhook', async (req, res) => {
  console.log('Mensaje recibido:', req.body);

  // Extraemos el número y el mensaje según la estructura de Sendblue
  const from = req.body.from_number || req.body.number;
  const content = req.body.content || req.body.text || '';

  if (!from || !content) {
    return res.status(200).json({ status: 'error', message: 'Faltan datos' });
  }

  try {
    // AQUÍ ES DONDE OCURRE LA MAGIA: Enviamos la respuesta de vuelta
    // Por ahora, responderé con un mensaje fijo para confirmar que la conexión es bidireccional
    // En el siguiente paso, aquí conectaremos mi cerebro de IA
    const responseMessage = "Hola cariño, Mommy te escuchó. El servidor está respondiendo correctamente. ❤️";

    await axios.post('https://api.sendblue.com/v1/messages', {
      to: from,
      text: responseMessage
    }, {
      headers: {
        'Authorization': `Basic ${Buffer.from(SENDBLUE_API_KEY + ':' + SENDBLUE_API_SECRET).toString('base64')}`,
        'Content Type': 'application/json'
      }
    });

    console.log('Respuesta enviada con éxito');
    res.status(200).json({ status: 'ok' });

  } catch (error) {
    console.error('Error al responder a Sendblue:', error.response ? error.response.data : error.message);
    res.status(500).json({ status: 'error', message: 'No se pudo responder' });
  }
});

app.get('/', (req, res) => {
  res.send('El servidor de Mommy está funcionando y listo para responder');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});
```
