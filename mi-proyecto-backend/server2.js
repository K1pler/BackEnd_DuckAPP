const express = require('express');
const app = express();
const path = require('path');
const port = 3000; // El puerto que prefieras

// Define la ruta absoluta hacia la carpeta del juego de Unity
const unityGamePath = 'C:/Users/rolan/Desktop/DUCK-APP/files/Pong';

// Sirve los archivos estáticos de tu juego de Unity WebGL
app.use(express.static(unityGamePath));

// Ruta principal que sirve tu juego Unity
app.get('/', (req, res) => {
  res.sendFile(path.join(unityGamePath, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
