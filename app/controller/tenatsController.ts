import type { HttpContext } from '@adonisjs/core/http'
import TenantService from '#services/tenantService'

const tenantService = new TenantService()

export default class TenantsController {
  async crearTenant({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'esquema', 'alias', 'estado'])
    const tenant = await tenantService.crearTenant(data)
    return response.status(201).json(tenant)
  }

  async listarTenants({ response }: HttpContext) {
    const tenants = await tenantService.listarTenant()
    return response.json(tenants)
  }
}
