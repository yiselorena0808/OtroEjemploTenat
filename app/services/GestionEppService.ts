import GestionEpp from '#models/gestion_epp'
import Producto from '#models/producto'

class GestionEppService {
  // Crear una gestión de EPP con productos filtrados por cargo
  async crearGestion(
    datos: Partial<GestionEpp>,
    productosIds: number[],
    usuario: any // usuario logueado
  ) {
    const gestion = await GestionEpp.create({
      ...datos,
      id_usuario: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      cargo: usuario.cargo,
      id_empresa: usuario.id_empresa,
      id_area: usuario.id_area,
    })

    if (productosIds && productosIds.length > 0) {
      await gestion.related('productos').attach(productosIds)
    }

    return await gestion.preload('productos')
  }

  // Listar todas las gestiones de la empresa del usuario
  async listarGestiones(usuario: any) {
    return await GestionEpp.query()
      .where('id_empresa', usuario.id_empresa)
      .preload('usuario')
      .preload('empresa')
      .preload('area')
      .preload('productos')
  }

  // Obtener una gestión por ID
  async obtenerGestion(id: number, usuario: any) {
    const gestion = await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', usuario.id_empresa)
      .preload('usuario')
      .preload('empresa')
      .preload('area')
      .preload('productos')
      .first()

    if (!gestion) throw new Error('Gestión no encontrada')
    return gestion
  }

  // Actualizar gestión
  async actualizarGestion(
    id: number,
    datos: Partial<GestionEpp>,
    productosIds: number[] | undefined,
    usuario: any
  ) {
    const gestion = await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', usuario.id_empresa)
      .first()

    if (!gestion) throw new Error('Gestión no encontrada')

    gestion.merge(datos)
    await gestion.save()

    if (productosIds) {
      await gestion.related('productos').sync(productosIds)
    }

    return await gestion.preload('productos')
  }

  // Eliminar gestión
  async eliminarGestion(id: number, usuario: any) {
    const gestion = await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', usuario.id_empresa)
      .first()

    if (!gestion) throw new Error('Gestión no encontrada')

    await gestion.delete()
    return { mensaje: 'Gestión eliminada correctamente' }
  }

  // Obtener productos disponibles filtrados por cargo del usuario
  async productosPorCargo(cargo: string) {
    return await Producto.query()
      .where('cargo_asignado', cargo)
      .andWhere('estado', true)
  }
}

export default new GestionEppService()
