import Area from '#models/area'

export default class AreaService {
  async crearArea(data: any) {
    return await Area.create(data)
  }

  async listarAreas() {
    return await Area.all()
  }

  async listarId(id: number) {
    return await Area.find(id)
  }

  async actualizar(id: number, data: any) {
    const area = await Area.find(id)
    if (!area) return null
    area.merge(data)
    await area.save()
    return area
  }

  async eliminar(id: number) {
    const area = await Area.find(id)
    if (!area) return 'Área no encontrada'
    await area.delete()
    return 'Área eliminada correctamente'
  }

  async conteo() {
    const total = await Area.query().count('* as total')
    return total[0]
  }
}
