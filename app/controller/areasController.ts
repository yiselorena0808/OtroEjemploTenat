import type { HttpContext } from '@adonisjs/core/http'
import AreaService from '#services/areaService'
import { messages } from '@vinejs/vine/defaults'

const areaService = new AreaService()

export default class AreasController {
  // Crear área
  async crearArea({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'nombre_area',
        'codigo_area',
        'descripcion',
        'id_empresa',
        'estado',
        'esquema',
        'alias',
      ])
      const area = await areaService.crearArea(data)
      return response.json({ msj: 'Área creada', datos: area })
    } catch (error) {
      return response.badRequest({ error: error.message, messages })
    }
  }

  // Listar todas las áreas
  async listarAreas({ response }: HttpContext) {
    try {
      const areas = await areaService.listarAreas()
      return response.json({ msj: 'Listado de áreas', datos: areas })
    } catch (error) {
      return response.badRequest({ error: error.message, messages })
    }
  }

  // Listar área por ID
  async listarId({ params, response }: HttpContext) {
    try {
      const area = await areaService.listarId(params.id)
      if (!area) {
        return response.notFound({ error: 'Área no encontrada' })
      }
      return response.json({ msj: 'Área encontrada', datos: area })
    } catch (error) {
      return response.badRequest({ error: error.message, messages })
    }
  }

  // Actualizar área
  async actualizar({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const area = await areaService.actualizar(params.id, data)
      if (!area) {
        return response.notFound({ error: 'Área no encontrada' })
      }
      return response.json({ msj: 'Área actualizada', datos: area })
    } catch (error) {
      return response.badRequest({ error: error.message, messages })
    }
  }

  // Eliminar área
  async eliminar({ params, response }: HttpContext) {
    try {
      const resp = await areaService.eliminar(params.id)
      return response.json({ msj: resp })
    } catch (error) {
      return response.badRequest({ error: error.message, messages })
    }
  }

  // Conteo de áreas
  async conteoAreas({ response }: HttpContext) {
    try {
      const conteo = await areaService.conteo()
      return response.json({ msj: 'Conteo realizado', datos: conteo })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}
