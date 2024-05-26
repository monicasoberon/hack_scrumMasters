const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();

const Maestro = require('./models/maestro');
const Estudiante = require('./models/estudiante');
const Curso = require('./models/curso');
const Asignacion = require('./models/asignacion');
const PdfDetails = require('./models/pdfs');

const mongoURI = 'mongodb+srv://monicasoberon:Hackathon@scrummasters.zm1sl.mongodb.net/';

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

router.get('/obtenerDatos', async (req, res) => {
    try {
        const maestroId = '1'; // ID del maestro específico
        const cursoId = '1'; // ID del curso específico

        // Buscar el maestro por ID
        const maestro = await Maestro.findById(maestroId);
        if (!maestro) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }

        console.log('Maestro encontrado:', maestro);

        // Buscar el curso por ID y maestro_id
        const curso = await Curso.findOne({ _id: cursoId, maestro_id: maestroId }).populate('estudiante_id');
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        console.log('Curso encontrado:', curso);

        // Obtener las asignaciones del curso
        const asignaciones = await Asignacion.find({ curso_id: curso._id });

        console.log('Asignaciones encontradas:', asignaciones);

        // Obtener los estudiantes y sus calificaciones
        const estudiantes = await Estudiante.find({ _id: { $in: curso.estudiante_id } });

        console.log('Estudiantes encontrados:', estudiantes.length);

        const resultados = estudiantes.map(estudiante => {
            const calificacionesEstudiante = asignaciones.map(asignacion => {
                const calificacion = estudiante.calificaciones.find(c => c.asignacion_id.toString() === asignacion._id.toString());
                return {
                    nombreAsignacion: asignacion.nombre,
                    calificacion: calificacion ? calificacion.calificacion : 'N/A'
                };
            });

            return {
                nombreEstudiante: `${estudiante.primer_nombre} ${estudiante.apellido}`,
                calificaciones: calificacionesEstudiante
            };
        });

        res.json({ curso: curso.nombre, maestro: `${maestro.primer_nombre} ${maestro.apellido}`, resultados });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Ruta para obtener los IDs y nombres de los cursos que imparte un maestro 
router.get('/obtenerCursos', async (req, res) => {
    try {
        const maestroId = '1'; // ID del maestro específico

        // Buscar el maestro por ID
        const maestro = await Maestro.findById(maestroId);
        if (!maestro) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }

        // Buscar los cursos que imparte el maestro
        const cursos = await Curso.find({ maestro_id: maestro._id }, '_id nombre');

        // Formatear la respuesta
        const resultado = cursos.map(curso => ({
            id: curso._id,
            nombre: curso.nombre
        }));

        res.json({ cursos: resultado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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

// Routes for Maestros
router.get('/verMaestro', async (req, res) => {
    try {
        const maestros = await Maestro.find().populate('id_curso');
        res.json(maestros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarMaestro', async (req, res) => {
    const nuevoMaestro = new Maestro(req.body);
    try {
        const maestro = await nuevoMaestro.save();
        res.status(201).json(maestro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Estudiantes
router.get('/verEstudiante', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find().populate('calificaciones.asignacion_id');
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarEstudiante', async (req, res) => {
    const nuevoEstudiante = new Estudiante(req.body);
    try {
        const estudiante = await nuevoEstudiante.save();
        res.status(201).json(estudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Cursos
router.get('/verCurso', async (req, res) => {
    try {
        const cursos = await Curso.find().populate('maestro_id').populate('estudiante_id');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarCurso', async (req, res) => {
    const nuevoCurso = new Curso(req.body);
    try {
        const curso = await nuevoCurso.save();
        res.status(201).json(curso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Asignaciones
router.get('/verAsignaciones', async (req, res) => {
    try {
        const asignaciones = await Asignacion.find().populate('curso_id');
        res.json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/agregarAsignaciones', async (req, res) => {
    const nuevaAsignacion = new Asignacion(req.body);
    try {
        const asignacion = await nuevaAsignacion.save();
        res.status(201).json(asignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
