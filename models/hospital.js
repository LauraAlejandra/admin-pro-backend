const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId, //esto indica que se relaciona con el esquema de usuario
        ref: 'Usuario'
    }
}, { collection: 'hospitales' }); //si no le pongo esto diria hospitals

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); //extraigo del objeto esos campos para que no se muestren
    return object;
})

module.exports = model('Hospital', HospitalSchema);