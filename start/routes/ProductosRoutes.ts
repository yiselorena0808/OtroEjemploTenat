import ProductosController from "../../app/controller/ProductosController.js";
import Route from "@adonisjs/core/services/router";

const productosController = new ProductosController();
// Rutas para productos
Route.get('/listarProductos', 'ProductosController.listarProductos');
Route.post('/crearProducto', 'ProductosController.crearProducto');
Route.get('/productosId/:id', 'ProductosController.obtenerProducto');
Route.put('/actualizarProducto/:id', 'ProductosController.actualizarProducto');
Route.delete('/eliminarProducto/:id', 'ProductosController.eliminarProducto');