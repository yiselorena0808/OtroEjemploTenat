import  pool  from './databases/pgDatabase.js';

async function crearTabla() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        apellido VARCHAR(100),
        nombre_usuario VARCHAR(100) UNIQUE NOT NULL,
        correo_electronico VARCHAR(150) UNIQUE NOT NULL,
        cargo VARCHAR(100),
        contrasena TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS reportes ( 
        id_reporte SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
        nombre_usuario VARCHAR(100),
        cargo VARCHAR(100),
        cedula VARCHAR(20),
        fecha DATE,
        lugar TEXT,
        descripcion TEXT,
        imagen TEXT,
        archivos TEXT,
        estado VARCHAR(50)
      );
      CREATE TABLE IF NOT EXISTS listas_chequeo (
      id SERIAL PRIMARY KEY,
      usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
      reporte_id INT REFERENCES reportes(id_reporte) ON DELETE SET NULL,
      usuario_nombre TEXT,
      fecha DATE,
      hora TEXT,
      modelo TEXT,
      marca TEXT,
      soat TEXT,
      tecnico TEXT,
      kilometraje TEXT
      );
      CREATE TABLE IF NOT EXISTS gestion_epp (
      id SERIAL PRIMARY KEY,
      usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
      nombre TEXT,
      apellido TEXT,
      cedula TEXT,
      cargo TEXT,
      productos TEXT,
      cantidad INT,
      importancia TEXT,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      estado VARCHAR(50) DEFAULT 'pendiente'
      );
      CREATE TABLE IF NOT EXISTS publicaciones_blog (
      id SERIAL PRIMARY KEY,
      usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      imagen TEXT,
      archivo TEXT,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS actividades_ludicas (
       id SERIAL PRIMARY KEY,
       usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
       nombre_usuario TEXT,
       nombre_actividad TEXT,
       fecha_actividad DATE,
       descripcion TEXT,
       imagen_video TEXT,
       archivo_adjunto TEXT
      );
    `);
    console.log('Tabla creada con éxito');
  } catch (err: any) {
    console.error('Error al crear la tabla:', err.message);
  }
}

export default crearTabla;
