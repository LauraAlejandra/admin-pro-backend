require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config');

const app = express();

//configurar cors
app.use(cors());

//Base de datos
dbConnection();
//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

//mongo atlas user y pwd
//mean_user
//mean_user