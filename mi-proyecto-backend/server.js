const express = require('express');
const { db } = require('./firebase'); // Importa db desde firebase.js

const app = express();
const port = 3000;

// Endpoint para probar la conexión a Firestore
app.get('/test-firestore', async (req, res) => {
  try {
    const docRef = db.collection('rewards').doc('template');
    const doc = await docRef.get();
    
    if (doc.exists) {
      res.send({ message: 'Conexión con Firestore exitosa.', data: doc.data() });
    } else {
      res.send({ message: 'El documento no existe, pero la conexión con Firestore fue exitosa.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al conectar con Firestore.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
