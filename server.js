require('./config/config');

const express = require('express');
const server = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//Conexion a la Base de Datos
require('./config/database');

//Settings
server.set('port', process.env.port);
server.use(express.static(path.join(__dirname, 'build')));
server.use(cors());

/*Middlewares*/
server.use(express.json());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())


/*Global Configuration Routes */
server.use(require('./Routes/index'));


//Statics Files
server.use(express.static(path.join(__dirname, 'public')));

server.get('/ping', function (req, res) {
  return res.send('pong');
});

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

  server.listen(process.env.PORT,()=>{
  console.log(`Server running on port: ${server.get('port')}`);
});