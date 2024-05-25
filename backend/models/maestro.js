const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maestroSchema = new Schema({
    _id: String,
    primer_nombre: String,
    apellido: String,
    correo_electronico: String,
    contrasena: String,
    id_curso: [{ type: String, ref: 'curso' }]
}, { collection: 'maestro' });

module.exports = mongoose.model('maestro', maestroSchema);
