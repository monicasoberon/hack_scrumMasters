const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    _id: String,
    primer_nombre: String,
    apellido: String,
    calificaciones: [
        {
            asignacion_id: { type: String, ref: 'Asignacion' },
            calificacion: Number
        }
    ]
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
