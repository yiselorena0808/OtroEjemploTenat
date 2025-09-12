import ListaChequeoService from '#services/ListaChequeoService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'



class ListaChequeoController {
private service = new ListaChequeoService()

  async crearLista({ request, response }: HttpContext) {
    try {
      const datos = request.only(['id_usuario','usuario_nombre', 'fecha', 'hora', 'modelo', 'marca', 'soat', 'tecnico', 'kilometraje']) as any
      datos.id_empresa = (request as any).empresaId
      const empresaId = (request as any).empresaId
      return this.service.crear(empresaId, datos)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarListas({ response }: HttpContext) {
    try {
      const empresaId = (Request as any).empresaId
      return this.service.listar(empresaId)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
  async actualizarLista({request,response,params}: HttpContext) {
    try {
      const id = params.id
      const datos = request.only(['id_usuario','usuario_nombre', 'fecha', 'hora', 'modelo', 'marca', 'soat', 'tecnico', 'kilometraje'])
      const empresaId = (request as any).empresaId
      return this.service.actualizar(id, empresaId,datos)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
  async eliminarLista({ params, response }: HttpContext) {
    try {
      const id = params.id
      const empresaId = (Request as any).empresaId
      return this.service.eliminar(id, empresaId)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default ListaChequeoController
