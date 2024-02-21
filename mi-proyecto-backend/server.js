const fastify = require('fastify')({ logger: true });
const db = require('./firebase');

// Endpoint para probar la conexión a Firestore
fastify.get('/test-firestore', async (request, reply) => {
  try {
    const docRef = db.collection('rewards').doc('template');
    const doc = await docRef.get();
    
    if (doc.exists) {
      reply.send({ message: 'Conexión con Firestore exitosa.', data: doc.data() });
    } else {
      reply.send({ message: 'El documento no existe, pero la conexión con Firestore fue exitosa.' });
    }
  } catch (error) {
    reply.status(500).send({ message: 'Error al conectar con Firestore.', error: error.message });
  }
});

// Ejecuta el servidor
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Servidor escuchando en ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
