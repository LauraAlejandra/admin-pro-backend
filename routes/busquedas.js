/*
    Esto se define en el index
    ruta: api/todo/:busqueda
*/

const { Router } = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);
module.exports = router;

//notas:
//para hacer validaciones hay que instalar npm i empress-validator
//los middlewares son funciones que se ejecutan antes de llegar a otras