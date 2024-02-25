const fastify = require('fastify')({ logger: true });
const { admin, db } = require('./firebase');


// Endpoint para probar la conexión a Firestore
/*fastify.get('/test-firestore', async (request, reply) => {
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
});*/

// Endpoint para registrar un nuevo usuario
fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body;
    
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password
      });
  
      // Aquí podrías también generar un token personalizado si es necesario
      // const token = await admin.auth().createCustomToken(userRecord.uid);
  
      reply.send({ success: true, uid: userRecord.uid, message: "Usuario creado con éxito." });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  });
  // Endpoint para iniciar sesión
fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    
    try {
      // Normalmente aquí iría la lógica para verificar las credenciales del usuario
      // Pero como es una demostración, solo vamos a buscar al usuario por email
      const userRecord = await admin.auth().getUserByEmail(email);
      
      // Si el usuario existe, puedes considerar que el inicio de sesión fue exitoso
      reply.send({ success: true, uid: userRecord.uid, message: "Inicio de sesión exitoso." });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
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
