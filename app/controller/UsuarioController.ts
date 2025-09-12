import type { HttpContext } from '@adonisjs/core/http'
import UsuarioService from '#services/UsuarioService'

const usuarioService = new UsuarioService()

export default class UsuarioController {
  private service = usuarioService

  // Endpoint para registrar usuario
  async register({ request, response }: HttpContext) {
    const datos = request.only([
      'id_empresa', 'id_area', 'nombre', 'apellido',
      'nombre_usuario', 'correo_electronico', 'cargo',
      'contrasena', 'confirmacion'
    ])

    const resultado = await this.service.register(
      datos.id_empresa,
      datos.id_area,
      datos.nombre,
      datos.apellido,
      datos.nombre_usuario,
      datos.correo_electronico,
      datos.cargo,
      datos.contrasena,
      datos.confirmacion
    )

    return response.status(201).json(resultado)
  }

  // Login - devuelve token JWT
  async login({ request, response }: HttpContext) {
    const { correo_electronico, contrasena } = request.only([
      'correo_electronico', 'contrasena'
    ])
    const resultado = await this.service.login(correo_electronico, contrasena)
    return response.json(resultado)
  }

  // Obtener usuario logueado mediante token
  async usuarioLogueado({ auth, response }: HttpContext) {
    try {
      const usuario = auth.user
      if (!usuario) {
        return response.unauthorized({ mensaje: 'Token inválido o expirado' })
      }
      return response.ok(usuario)
    } catch (error) {
      return response.internalServerError({ mensaje: error.message })
    }
  }
}
