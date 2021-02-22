/*
    Esto se define en el index
    ruta: /api/uploads
*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressfileUpload()); //para poder tener el middleware de las validaciones 

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', retornaImagen);

module.exports = router;

//notas:
//para hacer validaciones hay que instalar npm i empress-validator
//los middlewares son funciones que se ejecutan antes de llegar a otras