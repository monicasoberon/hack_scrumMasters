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

const mongoURI = 'mongodb+srv://fermoran:fermoran@scrummasters.zm1sl.mongodb.net/HackathonSM';

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
        const cursoId = req.query.cursoId; // ID del curso recibido desde la solicitud web

        if (!cursoId) {
            return res.status(400).json({ message: 'ID del curso es requerido' });
        }

        // Buscar el maestro por ID
        const maestro = await Maestro.findById(maestroId);
        if (!maestro) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }

        // Buscar el curso por ID y maestro_id
        const curso = await Curso.findOne({ _id: cursoId, maestro_id: maestroId }).populate('estudiante_id');
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Obtener las asignaciones del curso
        const asignaciones = await Asignacion.find({ curso_id: curso._id });

        // Obtener los estudiantes y sus calificaciones
        const estudiantes = await Estudiante.find({ _id: { $in: curso.estudiante_id } });

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

// Ruta para obtener los promedios de calificaciones de todos los cursos
router.get('/obtenerPromedios', async (req, res) => {
    try {
        // Obtener todos los cursos
        const cursos = await Curso.find().populate('estudiante_id');
        if (!cursos.length) {
            return res.status(404).json({ message: 'No se encontraron cursos' });
        }

        let resultados = [];

        for (const curso of cursos) {
            // Obtener las asignaciones del curso
            const asignaciones = await Asignacion.find({ curso_id: curso._id });

            // Obtener los estudiantes del curso
            const estudiantes = await Estudiante.find({ _id: { $in: curso.estudiante_id } });

            let totalCurso = 0;
            let totalAsignaciones = 0;

            const promediosAsignaciones = asignaciones.map(asignacion => {
                let totalAsignacion = 0;
                let countAsignacion = 0;

                estudiantes.forEach(estudiante => {
                    const calificacion = estudiante.calificaciones.find(c => c.asignacion_id === asignacion._id);
                    if (calificacion) {
                        totalAsignacion += parseInt(calificacion.calificacion, 10);
                        countAsignacion++;
                    }
                });

                const promedioAsignacion = countAsignacion > 0 ? totalAsignacion / countAsignacion : 0;
                totalCurso += totalAsignacion;
                totalAsignaciones += countAsignacion;

                return {
                    asignacion: asignacion.nombre,
                    promedio: promedioAsignacion
                };
            });

            const promedioCurso = totalAsignaciones > 0 ? totalCurso / totalAsignaciones : 0;

            resultados.push({
                curso: curso.nombre,
                maestro: "Julen Hoppenstendt",
                promediosAsignaciones,
                promedioCurso
            });
        }

        res.json(resultados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener información del estudiante por nombre
router.get('/obtenerInfoEstudiante/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;

        // Buscar el estudiante por nombre
        const estudiante = await Estudiante.findOne({ primer_nombre: nombre });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Obtener las asignaciones y sus calificaciones
        const asignaciones = await Asignacion.find();
        const calificacionesEstudiante = asignaciones.map(asignacion => {
            const calificacion = estudiante.calificaciones.find(c => c.asignacion_id.toString() === asignacion._id.toString());
            return {
                nombreAsignacion: asignacion.nombre,
                calificacion: calificacion ? calificacion.calificacion : 'N/A'
            };
        });

        // Formatear la respuesta
        const resultado = {
            nombreEstudiante: `${estudiante.primer_nombre} ${estudiante.apellido}`,
            calificaciones: calificacionesEstudiante
        };

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para calcular el promedio de cada estudiante en un curso específico
router.get('/calcularPromediosEstudiantes/:cursoId', async (req, res) => {
    try {
        const { cursoId } = req.params;

        // Obtener el curso y verificar que exista
        const curso = await Curso.findById(cursoId).populate('estudiante_id');
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Obtener los estudiantes del curso
        const estudiantes = await Estudiante.find({ _id: { $in: curso.estudiante_id } });

        // Calcular el promedio de cada estudiante
        const resultados = estudiantes.map(estudiante => {
            const totalCalificaciones = estudiante.calificaciones.reduce((total, calificacion) => total + parseInt(calificacion.calificacion, 10), 0);
            const promedio = (totalCalificaciones / estudiante.calificaciones.length).toFixed(2);

            return {
                estudiante: `${estudiante.primer_nombre} ${estudiante.apellido}`,
                promedio: promedio
            };
        });

        res.json(resultados);
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
