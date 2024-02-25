const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

const port = 3000; // Define la variable 'port' que se usará para el servidor HTTPS

// Ruta absoluta hacia la carpeta del juego de Unity
const unityGamePath = 'C:/Users/rolan/Desktop/DUCK-APP/files/Pong';

// Cargar clave privada y certificado para HTTPS
const privateKey = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'server.cert'), 'utf8');

// Sirve los archivos estáticos de tu juego de Unity WebGL con Brotli si está disponible
// Middleware para manejar la codificación Brotli
app.get('*.*', (req, res, next) => {
    if (req.url.endsWith('.br')) {
      res.set('Content-Encoding', 'br');
      res.set('Content-Type', req.url.endsWith('.js') ? 'application/javascript' : 'text/plain');
    }
    next();
  });

app.use(express.static(unityGamePath));

// Ruta principal que sirve tu juego Unity
app.get('/', (req, res) => {
    res.sendFile(path.join(unityGamePath, 'index.html'));
});

// Crear un servidor HTTPS
const httpsServer = https.createServer({
  key: privateKey,
  cert: certificate
}, app);

// Iniciar el servidor HTTPS
httpsServer.listen(port, () => {
    console.log(`Servidor escuchando en https://localhost:${port}`);
});