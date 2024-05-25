const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    _id: String,
    nombre: String,
    maestro_id: { type: String, ref: 'maestro' },
    estudiante_id: [{ type: String, ref: 'estudiante' }]
}, { collection: 'curso' });

module.exports = mongoose.model('curso', cursoSchema);
