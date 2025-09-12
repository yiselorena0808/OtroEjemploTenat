import ListaChequeoService from '#services/ListaChequeoService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext } from '@adonisjs/core/http'

export default class ListaChequeoController {
  private service: ListaChequeoService

  constructor() {
    this.service = new ListaChequeoService()
  }

  // Crear lista
  async crearLista({ request, response }: HttpContext) {
    try {
      const datos = request.only([
        'fecha',
        'hora',
        'modelo',
        'marca',
        'soat',
        'tecnico',
        'kilometraje',
      ]) as any

      const user = (request as any).user
      if (!user) {
        return response.unauthorized({ error: 'Usuario no autenticado' })
      }

      datos.id_usuario = user.id
      datos.usuario_nombre = user.nombre  // 👈 ahora sí el nombre real del usuario
      datos.id_empresa = user.id_empresa

      const nuevaLista = await this.service.crear(datos)
      return response.created(nuevaLista)
    } catch (error) {
      console.error('Error crearLista:', error)
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Listar listas
  async listarListas({ response, request }: HttpContext) {
    try {
      const user = (request as any).user
      const listas = await this.service.listar(user.id_empresa)
      return response.ok(listas)
    } catch (error) {
      console.error('Error listarListas:', error)
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Actualizar lista
  async actualizarLista({ request, response, params }: HttpContext) {
    try {
      const id = params.id
      const datos = request.only([
        'fecha',
        'hora',
        'modelo',
        'marca',
        'soat',
        'tecnico',
        'kilometraje',
      ])

      const user = (request as any).user
      const lista = await this.service.actualizar(id, user.id_empresa, datos)
      return response.ok(lista)
    } catch (error) {
      console.error('Error actualizarLista:', error)
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Eliminar lista
  async eliminarLista({ params, response, request }: HttpContext) {
    try {
      const user = (request as any).user
      const result = await this.service.eliminar(params.id, user.id_empresa)
      return response.ok(result)
    } catch (error) {
      console.error('Error eliminarLista:', error)
      return response.status(500).json({ error: error.message, messages })
    }
  }
}
