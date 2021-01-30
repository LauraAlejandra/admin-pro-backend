require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config');

const app = express();

//configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

//mongo atlas user y pwd
//mean_user
//mean_user