import type { HttpContext } from '@adonisjs/core/http'
import Jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'sstrict'

export default class AuthJwtMiddleware {
  public async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized({ error: 'Falta el token' })
    }

    try {
      const token = authHeader.replace('Bearer', '').trim()
      const decoded = Jwt.verify(token, SECRET) as any

      ;(request as any).user = decoded
      await next()
    } catch (error) {
      return response.unauthorized({ error: 'Token inválido' })
    }
  }
}
