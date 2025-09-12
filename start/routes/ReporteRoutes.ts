import Route from "@adonisjs/core/services/router"
import ReportesController from "../../app/controller/ReporteController.js"
//import AuthJwt from "../../app/middleware/auth_jwt.js"

const reporte = new ReportesController()
//const authJwt = new AuthJwt()

Route.post('/crearReporte', reporte.crearReporte)//.use(authJwt.handle.bind(authJwt))
Route.get('/listarReportes', reporte.listarReportes)//.use(authJwt.handle.bind(authJwt))
Route.get('/idReporte/:id', reporte.listarReporteId)//.use(authJwt.handle.bind(authJwt))
Route.put('/actualizarReporte/:id', reporte.actualizarReporte)//.use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarReporte/:id', reporte.eliminarReporte)//.use(authJwt.handle.bind(authJwt))
Route.get('/conteoReportes', reporte.conteoReportes)//.use(authJwt.handle.bind(authJwt))
