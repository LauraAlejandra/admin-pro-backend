const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId, //esto indica que se relaciona con el esquema de usuario
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId, //esto indica que se relaciona con el esquema de usuario
        ref: 'Hospital',
        required: true
    }
});

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); //extraigo del objeto esos campos para que no se muestren
    return object;
})

module.exports = model('Medico', MedicoSchema);