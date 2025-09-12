import ListaChequeo from '#models/lista_chequeo'

export default class ListaChequeoService {
  async crear(datos: any) {
    return await ListaChequeo.create(datos)
  }

  async listar(id_empresa: number) {
    return await ListaChequeo.query().where('id_empresa', id_empresa)
  }

  async actualizar(id: number, id_empresa: number, datos: any) {
    const lista = await ListaChequeo.query()
      .where('id', id)
      .where('id_empresa', id_empresa)
      .firstOrFail()

    await lista.merge(datos).save()
    return lista
  }

  async eliminar(id: number, id_empresa: number) {
    const lista = await ListaChequeo.query()
      .where('id', id)
      .where('id_empresa', id_empresa)
      .firstOrFail()

    await lista.delete()
    return { mensaje: 'Lista eliminada correctamente' }
  }
}
