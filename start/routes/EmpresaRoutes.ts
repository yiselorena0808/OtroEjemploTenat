import Route from "@adonisjs/core/services/router"

// Controller
// Nota: path absoluto desde App/, sin extensión
import EmpresaController from '../../app/controller/EmpresaController.js'

// Middleware
import EmpresaMiddleware from '#middleware/EmpresaMildeware'

// Ruta pública: listar empresas
Route.get('/listarEmpresas', 'EmpresaController.listarEmpresas')

// Ruta privada: crear empresa
Route.post('/crearEmpresa', 'EmpresaController.crearEmpresa')
  .middleware([EmpresaMiddleware])
