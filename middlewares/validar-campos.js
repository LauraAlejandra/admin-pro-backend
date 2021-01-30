const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    const errores = validationResult(req); //esto crea un arreglo con todos los errores que pasaron por la ruta
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next(); //si todo sale bien se llama a la función
}

module.exports = {
    validarCampos
}