const admin = require('firebase-admin');

// Reemplaza el path del require con la ruta a tu archivo de credenciales descargado
const serviceAccount = require('./duck-team-firebase-adminsdk-e0smk-4ac453f97c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;

module.exports = { admin, db }; // Exporta ambos objetos