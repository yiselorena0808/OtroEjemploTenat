import type { HttpContext } from '@adonisjs/core/http'
import GestionEppService from '#services/GestionEppService'

export default class GestionEppController {
  // Crear gestión
  async store({ request, auth, response }: HttpContext) {
    const usuario = auth.user!
    const { productosIds, cantidad, importancia, estado, fecha_creacion } =
      request.body()

    try {
      const gestion = await GestionEppService.crearGestion(
        { cantidad, importancia, estado, fecha_creacion },
        productosIds,
        usuario
      )

      return response.created({
        mensaje: 'Gestión creada correctamente',
        datos: gestion,
      })
    } catch (err: any) {
      return response.status(400).send({ mensaje: err.message })
    }
  }

  // Listar gestiones
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!
    const gestiones = await GestionEppService.listarGestiones(usuario)
    return response.ok(gestiones)
  }

  // Mostrar gestión por ID
  async show({ params, auth, response }: HttpContext) {
    const usuario = auth.user!
    try {
      const gestion = await GestionEppService.obtenerGestion(params.id, usuario)
      return response.ok(gestion)
    } catch (err: any) {
      return response.status(404).send({ mensaje: err.message })
    }
  }

  // Actualizar gestión
  async update({ params, request, auth, response }: HttpContext) {
    const usuario = auth.user!
    const { productosIds, cantidad, importancia, estado, fecha_creacion } =
      request.body()

    try {
      const gestion = await GestionEppService.actualizarGestion(
        params.id,
        { cantidad, importancia, estado, fecha_creacion },
        productosIds,
        usuario
      )

      return response.ok({ mensaje: 'Gestión actualizada', datos: gestion })
    } catch (err: any) {
      return response.status(400).send({ mensaje: err.message })
    }
  }

  // Eliminar gestión
  async destroy({ params, auth, response }: HttpContext) {
    const usuario = auth.user!
    try {
      const result = await GestionEppService.eliminarGestion(params.id, usuario)
      return response.ok(result)
    } catch (err: any) {
      return response.status(400).send({ mensaje: err.message })
    }
  }

  // Listar productos filtrados por cargo
  async productosPorCargo({ auth, response }: HttpContext) {
    const usuario = auth.user!
    const productos = await GestionEppService.productosPorCargo(usuario.cargo)
    return response.ok(productos)
  }
}
