require('dotenv').config();
const Server = require('./models/server');

// Inicializar el Server
const server = new Server();
server.listen();


// const express = require('express')


// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// app.listen(process.env.PORT)