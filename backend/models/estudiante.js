const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    _id: String,
    primer_nombre: String,
    apellido: String,
    calificaciones: [{
        asignacion_id: { type: String, ref: 'asignacion' },
        calificacion: Number
    }]
}, { collection: 'estudiante' });

module.exports = mongoose.model('estudiante', estudianteSchema);
