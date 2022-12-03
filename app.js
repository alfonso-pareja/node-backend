require('dotenv').config();
const Server = require('./models/server');

// Inicializa el Server
const server = new Server();
server.listen();
