const mongoose = require('mongoose');

const asignacionSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    fecha: Date,
    curso_id: { type: String, ref: 'curso' }
});

module.exports = mongoose.model('asignacion', asignacionSchema);
