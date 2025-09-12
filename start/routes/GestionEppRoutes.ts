import Route from '@adonisjs/core/services/router'
import CargosController from '#controller/CargosController'

// Ruta pública: listar cargos
Route.get('/listarCargos', 'CargosController.listarCargos')
// Ruta privada: crear cargo
Route.post('/crearCargo', 'CargosController.crearCargo')

// Ruta privada: actualizar cargo
Route.put('/actualizarCargo/:id', 'CargosController.actualizarCargo')

// Ruta privada: eliminar cargo
Route.delete('/eliminarCargo/:id', 'CargosController.eliminarCargo')

// Nota: middleware se puede aplicar a nivel de controlador o ruta
// Ruta privada: listar cargos activos
Route.get('/listarCargosActivos', 'CargosController.listarCargosActivos')

// Ruta privada: listar cargos inactivos
Route.get('/listarCargosInactivos', 'CargosController.listarCargosInactivos')

// Ruta privada: listar cargo por ID
Route.get('/listarCargo/:id', 'CargosController.listarCargo')

// Ruta privada: conteo de cargos
Route.get('/conteoCargos', 'CargosController.conteoCargos')
