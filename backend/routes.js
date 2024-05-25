const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const pdfkit = require('pdfkit');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const Maestro = require('./models/maestro');
const Estudiante = require('./models/estudiante');
const Curso = require('./models/curso');
const Asignacion = require('./models/asignacion');
const PdfDetails = require('./models/Pdf');

const mongoURI = 'mongodb+srv://monicasoberon2747:ScrumMasters100@cluster0.r9bpf.mongodb.net/ScrumMasters';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = Date.now() + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

// Routes for Maestros
router.get('/maestros', async (req, res) => {
    try {
        const maestros = await Maestro.find();
        res.json(maestros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/maestros', async (req, res) => {
    const maestro = new Maestro(req.body);
    try {
        const newMaestro = await maestro.save();
        res.status(201).json(newMaestro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Estudiantes
router.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/estudiantes', async (req, res) => {
    const estudiante = new Estudiante(req.body);
    try {
        const newEstudiante = await estudiante.save();
        res.status(201).json(newEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Cursos
router.get('/cursos', async (req, res) => {
    try {
        const cursos = await Curso.find().populate('teacher_id');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/cursos', async (req, res) => {
    const curso = new Curso(req.body);
    try {
        const newCurso = await curso.save();
        res.status(201).json(newCurso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Asignaciones
router.get('/asignaciones', async (req, res) => {
    try {
        const asignaciones = await Asignacion.find().populate('curso_id');
        res.json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/asignaciones', async (req, res) => {
    const asignacion = new Asignacion(req.body);
    try {
        const newAsignacion = await asignacion.save();
        res.status(201).json(newAsignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PDF file upload endpoint
router.post('/upload-files', upload.single('file'), async (req, res) => {
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await PdfDetails.create({ title: title, pdf: fileName });
        res.send({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Get all uploaded PDF files endpoint
router.get('/get-files', async (req, res) => {
    try {
        const files = await PdfDetails.find({});
        res.json({ status: 'ok', data: files });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Endpoint to retrieve PDF from GridFS
router.get('/get-pdf/:filename', async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'No file exists' });
        }

        // Check if it is a PDF
        if (file.contentType === 'application/pdf') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ message: 'Not a PDF file' });
        }
    });
});

module.exports = router;
