import ReporteService from '#services/ReporteService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext } from '@adonisjs/core/http'

const reporteService = new ReporteService()

class ReportesController {
  // Crear un reporte asignado a la empresa del usuario logueado
  async crearReporte({ request, response }: HttpContext) {
    try {
      const user = (request as any).authUsuario
      if (!user || !user.idEmpresa) {
        return response.unauthorized({ error: 'Usuario no tiene empresa asociada' })
      }

      const datos = request.only([
        'nombre_usuario',
        'cargo',
        'cedula',
        'fecha',
        'lugar',
        'descripcion',
        'imagen',
        'archivos',
        'estado',
      ]) as any

      datos.id_empresa = user.idEmpresa
      datos.id_usuario = user.id

      const reporteCreado = await reporteService.crear(user.idEmpresa, datos)
      return response.status(201).json({ mensaje: 'Reporte creado', datos: reporteCreado })
    } catch (error) {
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Listar solo los reportes de la empresa del usuario logueado
  async listarReportes({ request, response }: HttpContext) {
    try {
      const user = (request as any).authUsuario
      if (!user || !user.idEmpresa) {
        return response.unauthorized({ error: 'Usuario no tiene empresa asociada' })
      }

      const reportes = await reporteService.listar(user.idEmpresa)
      return response.json({ datos: reportes })
    } catch (error) {
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Obtener detalle por ID (solo de la misma empresa)
  async listarReporteId({ params, response }: HttpContext) {
    try {
      const user = (params as any).authUsuario
      if (!user || !user.idEmpresa) {
        return response.unauthorized({ error: 'Usuario no tiene empresa asociada' })
      }

      const reporte = await reporteService.listarId(params.id, user.idEmpresa)
      return response.json({ datos: reporte })
    } catch (error) {
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Actualizar un reporte
  async actualizarReporte({ params, request, response }: HttpContext) {
    try {
      const user = (request as any).authUsuario
      if (!user || !user.idEmpresa) {
        return response.unauthorized({ error: 'Usuario no tiene empresa asociada' })
      }

      const datos = request.only([
        'nombre_usuario',
        'cargo',
        'cedula',
        'fecha',
        'lugar',
        'descripcion',
        'imagen',
        'archivos',
        'estado',
      ])
      const reporteActualizado = await reporteService.actualizar(params.id, user.idEmpresa, datos)
      return response.json({ mensaje: 'Reporte actualizado', datos: reporteActualizado })
    } catch (error) {
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Eliminar un reporte
  async eliminarReporte({ params, request, response }: HttpContext) {
    try {
      const user = (request as any).authUsuario
      if (!user || !user.idEmpresa) {
        return response.unauthorized({ error: 'Usuario no tiene empresa asociada' })
      }

      await reporteService.eliminar(params.id, user.idEmpresa)
      return response.json({ mensaje: 'Reporte eliminado' })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export default ReportesController
