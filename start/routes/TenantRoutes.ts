import Route from "@adonisjs/core/services/router"
import TenantStorage from "../../app/services/TenantStorage.js"
import Usuario from "#models/usuario"


async function tenantMiddleware(ctx:any, next:any) {
  const tenantId = Number(ctx.request.header("x-tenant-id"))
  if (!tenantId) {
    return ctx.response.status(400).send({ error: "Falta el header x-tenant-id" })
  }
// @ts-expect-error tenantId no coincide con TenantContext
  TenantStorage.run(tenantId, async () => {
    await next()
  })
}

// GET - Consultar datos del tenant actual
Route.get("/tenant", async (ctx) => {
  const tenantId = TenantStorage.getTenantId()
  return ctx.response.send({ mensaje: `Estás en el tenant ${tenantId}` })
}).middleware(tenantMiddleware)

Route.get('/usuarios', async (ctx) => {
  const id_tenat = TenantStorage.getTenantId()
  if (!id_tenat) {
      return ctx.response.status(400).send({ error: "No se encontró el tenant actual" })
    }
  const usuarios = await Usuario.query().where('id_tenat', id_tenat)

  return ctx.response.send({
    tenant: id_tenat,
    total: usuarios.length,
    usuarios
  })
})

// POST - Crear algo en el tenant
Route.post("/tenant", async (ctx) => {
  const tenantId = TenantStorage.getTenantId()
  const data = ctx.request.body()
  return ctx.response.send({
    mensaje: `Creado en tenant ${tenantId}`,
    datos: data
  })
}).middleware(tenantMiddleware)

// PUT - Actualizar algo en el tenant
Route.put("/tenant/:id", async (ctx) => {
  const tenantId = TenantStorage.getTenantId()
  const { id } = ctx.params
  const data = ctx.request.body()
  return ctx.response.send({
    mensaje: `Actualizado ID ${id} en tenant ${tenantId}`,
    datos: data
  })
}).middleware(tenantMiddleware)

// DELETE - Eliminar algo en el tenant
Route.delete("/tenant/:id", async (ctx) => {
  const tenantId = TenantStorage.getTenantId()
  const { id } = ctx.params
  return ctx.response.send({
    mensaje: `Eliminado ID ${id} en tenant ${tenantId}`
  })
}).middleware(tenantMiddleware)

