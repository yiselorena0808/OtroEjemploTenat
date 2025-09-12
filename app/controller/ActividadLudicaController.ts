import ActividadLudicaService from '#services/ActividadLudicaService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'


class ActividadesLudicasController {
 private service = new ActividadLudicaService()

  async crearActividad({ request, response }: HttpContext) {
    try {
      const empresaId = (request as any).empresaId
      const datos = request.only(['nombre_usuario', 'nombre_actividad', 'fecha_actividad', 'imagen_video', 'archivo_adjunto', 'descripcion']) as any
      datos.id_empresa = (request as any).empresaId
      return this.service.crear(empresaId, datos)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarActividades({ response, request }: HttpContext) {
    try {
      const empresaId = (request as any).empresaId
      return this.service.listar(empresaId)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarIdActividad({ params, response, request }: HttpContext) {
    try {
      const id = params.id
      const empresaId = (request as any).empresaId
      return this.service.listarId(id, empresaId)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async eliminarActividad({ params, response, request }: HttpContext) {
    try {
      const id = params.id
      const empresaId = (request as any).empresaId
      return this.service.eliminar(id, empresaId)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }}

    async actualzarActividad({request,response,params}: HttpContext) {  
      try {
        const id = params.id
        const empresaId = (request as any).empresaId
        const datos = request.only(['nombre_usuario', 'nombre_actividad', 'fecha_actividad', 'imagen_video', 'archivo_adjunto', 'descripcion'])
       
        return this.service.actualizar(id, empresaId,datos)
      } catch (error) {
        return response.json({ error: error.message, messages })
      }
    }
}

export default ActividadesLudicasController