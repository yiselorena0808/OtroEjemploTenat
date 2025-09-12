import BlogService from '#services/PublicacionBlogService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'

const blogService = new BlogService()

class BlogController {
  async crearBlog({ request, response }: HttpContext) {
    try {
      const datos = request.only(['nombre_usuario', 'titulo', 'fecha_actividad', 'descripcion', 'imagen', 'archivo'])as any
      datos.id_empresa = (request as any).empresaId
      const empresaId = (request as any).empresaId
      return blogService.crear(empresaId, datos)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarBlog({ response }: HttpContext) {
    try {
      const empresaId = (Request as any).empresaId
      return blogService.listar(empresaId)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default BlogController