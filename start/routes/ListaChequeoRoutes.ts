import Route from "@adonisjs/core/services/router"
import ListaChequeoController from "../../app/controller/ListaChequeoController.js"
import AuthJwtMiddleware from "#middleware/auth_jwt"

const lista = new ListaChequeoController()
const authJwt = new AuthJwtMiddleware()

Route.post('/crearListaChequeo', lista.crearLista).use(authJwt.handle.bind(authJwt))
Route.get('/listarListasChequeo', lista.listarListas).use(authJwt.handle.bind(authJwt))
Route.put('/actualizarListaChequeo/:id', lista.actualizarLista).use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarListaChequeo/:id', lista.eliminarLista).use(authJwt.handle.bind(authJwt))

