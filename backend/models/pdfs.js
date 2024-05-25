const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfDetailsSchema = new Schema({
    title: Schema.Types.ObjectId,
    pdf: String,
    curso_id: { type: Schema.Types.ObjectId, ref: 'curso' }
}, { collection: 'pdfdetails' });

module.exports = mongoose.model('pdfdetails', pdfDetailsSchema);
