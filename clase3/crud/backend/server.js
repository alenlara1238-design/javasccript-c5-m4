const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir la carpeta 'public' para que las imágenes sean accesibles mediante URL
// Ejemplo: http://localhost:3000/static/uploads/angular.png
app.use('/static', express.static(path.join(__dirname, 'public')));

// Función utilitaria para construir la URL de la imagen local de forma dinámica
const getImageUrl = (imageName) => {
  return `http://localhost:3000/static/uploads/${imageName}.png`;
};

// Base de datos simulada en memoria (Mock Data)
let courses = [
  {
    id: "1",
    title: "Master en Angular moderno",
    description: "Aprende Componentes Standalone, Signals y control de estado desde cero hasta profesional.",
    instructor: "Prof. Alejandro Ruiz",
    image: getImageUrl("angular"), // Genera: http://localhost:3000/static/uploads/angular.png
    duration: "30 horas",
    level: "Intermedio",
    syllabus: ["Estructura de proyectos", "Arquitectura de componentes", "Signals y Reactividad", "Consumo de APIs de forma limpia"]
  },
  {
    id: "2",
    title: "Desarrollo Backend con Node y Express",
    description: "Construye APIs REST robustas, escalables y seguras utilizando JavaScript en el servidor.",
    instructor: "Ing. Laura Mendoza",
    image: getImageUrl("node"), // Genera: http://localhost:3000/static/uploads/node.png
    duration: "25 horas",
    level: "Principiante",
    syllabus: ["Introducción a Node.js", "Middlewares en Express", "Ruteo y Controladores", "Conexión a Bases de Datos"]
  },
  {
    id: "3",
    title: "Python para Ciencia de Datos",
    description: "Domina las librerías esenciales para el análisis de datos, visualización y machine learning.",
    instructor: "Dr. Carlos Gómez",
    image: getImageUrl("python"), // Genera: http://localhost:3000/static/uploads/python.png
    duration: "40 horas",
    level: "Avanzado",
    syllabus: ["Sintaxis avanzada y POO", "Manipulación de datos con Pandas", "Visualización con Matplotlib", "Modelos de regresión básicos"]
  },
  {
    id: "4",
    title: "Programación Orientada a Objetos con Java",
    description: "Domina los pilares de POO, colecciones, streams y buenas prácticas de desarrollo empresarial.",
    instructor: "Ing. Manuel Espinoza",
    image: getImageUrl("java"), // Genera: http://localhost:3000/static/uploads/java.png
    duration: "35 horas",
    level: "Intermedio",
    syllabus: ["Clases, Objetos y Herencia", "Polimorfismo e Interfaces", "Java Streams y Optionals", "Manejo de Excepciones"]
  }
];

// --- ENDPOINTS DE LA API REST (CRUD) ---


app.get('/api/courses', (req, res) => {
  res.status(200).json(courses);
});


app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ message: "Curso no encontrado" });
  res.status(200).json(course);
});

app.post('/api/courses', (req, res) => {
  const { title, description, instructor, imageName, duration, level, syllabus } = req.body;
  
  if (!title || !instructor) {
    return res.status(400).json({ message: "El título y el instructor son obligatorios" });
  }

  const newCourse = {
    id: Date.now().toString(),
    title,
    description: description || "",
    instructor,
    // Si al crear el curso envían "git", se guardará la URL completa apuntando a git.png
    image: getImageUrl(imageName || "default"), 
    duration: duration || "No especificada",
    level: level || "General",
    syllabus: syllabus || []
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});


app.put('/api/courses/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Curso no encontrado" });

  const updatedData = { ...req.body };
  
  // Si en la actualización modifican el "imageName", regeneramos la propiedad "image"
  if (updatedData.imageName) {
    updatedData.image = getImageUrl(updatedData.imageName);
    delete updatedData.imageName; // Limpiamos la propiedad temporal
  }

  courses[index] = { ...courses[index], ...updatedData, id: req.params.id };
  res.status(200).json(courses[index]);
});


app.delete('/api/courses/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Curso no encontrado" });

  const deletedCourse = courses.splice(index, 1);
  res.status(200).json({ message: "Curso eliminado con éxito", course: deletedCourse[0] });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en: http://localhost:${PORT}`);
});