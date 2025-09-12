import Route from "@adonisjs/core/services/router"
import BlogController from "../../app/controller/PublicacionBlogController.js"

const blog = new BlogController()

Route.post('/crearBlog', blog.crearBlog)
Route.get('/listarBlog', blog.listarBlog)