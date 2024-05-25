const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();

const maestro = require('./models/maestro');
const estudiante = require('./models/estudiante');
const curso = require('./models/curso');
const asignacion = require('./models/asignacion');
const pdfDetails = require('./models/pdfs');

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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            cb(null, filename);
        });
    }
});

const upload = multer({ storage });

router.get('/test', (req, res) => {
    res.send('Test route');
  });

// Route to upload PDF with curso_id
router.post('/upload-files', upload.single('file'), async (req, res) => {
    const { title, curso_id } = req.body;
    const fileName = req.file.filename;
    try {
        await PdfDetails.create({ title: title, pdf: fileName, curso_id: curso_id });
        res.send({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Route to get PDFs for a specific course
router.get('/get-files/:curso_id', async (req, res) => {
    const { curso_id } = req.params;
    try {
        const files = await PdfDetails.find({ curso_id: curso_id });
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


// Add the login route here
router.post('/login', async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    try {
        const maestro = await maestro.findOne({ correo_electronico });
        if (!maestro || maestro.contrasena !== contrasena) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', maestroId: maestro._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes for Maestros
router.get('/verMaestro', async (req, res) => {
    try {
        const maestros = await maestro.find().populate('curso');
        res.json(maestros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarMaestro', async (req, res) => {
    const maestros = new maestro(req.body);
    try {
        const newMaestro = await maestros.save();
        res.status(201).json(newMaestro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Estudiantes
router.get('/verEstudiante', async (req, res) => {
    try {
        const estudiantes = await estudiante.find().populate('calificaciones.asignacion_id');
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarEstudiante', async (req, res) => {
    const estudiantes = new estudiante(req.body);
    try {
        const newEstudiante = await estudiantes.save();
        res.status(201).json(newEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Cursos
router.get('/verCurso', async (req, res) => {
    try {
        const cursos = await curso.find().populate('maestro_id').populate('estudiante');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarCurso', async (req, res) => {
    const cursos = new curso(req.body);
    try {
        const newCurso = await cursos.save();
        res.status(201).json(newCurso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Asignaciones
router.get('/verAsignaciones', async (req, res) => {
    try {
        const asignaciones = await asignacion.find().populate('curso_id');
        res.json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarAsignaciones', async (req, res) => {
    const asignaciones = new asignacion(req.body);
    try {
        const newAsignacion = await asignaciones.save();
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
        await pdfDetails.create({ title: title, pdf: fileName });
        res.send({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Get all uploaded PDF files endpoint
router.get('/get-files', async (req, res) => {
    try {
        const files = await pdfDetails.find({});
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
