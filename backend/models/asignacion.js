const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignacionSchema = new Schema({
    _id: String,
    nombre: String,
    fecha: Date,
    curso_id: { type: String, ref: 'curso' }
}, { collection: 'asignacion' });

module.exports = mongoose.model('asignacion', asignacionSchema);
