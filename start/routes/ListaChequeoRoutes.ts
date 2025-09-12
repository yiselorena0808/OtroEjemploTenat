import Route from "@adonisjs/core/services/router"
import ListaChequeoController from "../../app/controller/ListaChequeoController.js"
//import AuthJwt from "../../app/middleware/auth_jwt.js"

const lista = new ListaChequeoController()
//const authJwt = new AuthJwt()

Route.post('/crearListaChequeo', lista.crearLista)//.use(authJwt.handle.bind(authJwt))
Route.get('/listarListasChequeo', lista.listarListas)//.use(authJwt.handle.bind(authJwt))
Route.put('/actualizarListaChequeo/:id', lista.actualizarLista)//.use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarListaChequeo/:id', lista.eliminarLista)//.use(authJwt.handle.bind(authJwt))
