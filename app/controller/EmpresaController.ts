import EmpresaService from '#services/EmpresaService'
import type { HttpContext } from '@adonisjs/core/http'

const empresaService = new EmpresaService()

export default class EmpresaController {
  async crearEmpresa({ request, response }: HttpContext) {
    try {
      const datos = request.body()
      const nueva = await empresaService.crear(datos)
      return response.json({ msj: 'empresa creada', datos: nueva })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async listarEmpresas({ response }: HttpContext) {
    try {
      const empresas = await empresaService.listarNombresActivas()
      return response.json({ msj: 'listado', datos: empresas })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}
