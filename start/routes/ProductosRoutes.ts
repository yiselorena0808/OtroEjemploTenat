import ProductosController from "../../app/controller/ProductosController.js";
import Route from "@adonisjs/core/services/router";

const productosController = new ProductosController();
// Rutas para productos
Route.get('/listarProductos', productosController.index);
Route.post('/crearProducto', productosController.store);
Route.get('/productosId/:id', productosController.show);
Route.put('/actualizarProducto/:id', productosController.update);
Route.delete('/eliminarProducto/:id', productosController.destroy);