import Empresa from '#models/empresa'

export default class EmpresaService {
  
  // Crear empresa
  async crear(datos: any) {
    return Empresa.create(datos)
  }

  // Listar solo empresas activas con id y nombre
  async listarNombresActivas() {
    const empresas = await Empresa.query()
      .select('id_empresa', 'nombre')
      .where('estado', true)
    return empresas || []
  }

  // Opcional: listar empresas inactivas
  async listarInactivas() {
    const empresas = await Empresa.query()
      .select('id_empresa', 'nombre')
      .where('estado', false)
    return empresas || []
  }

  // Listar por ID
  async listarId(id: number) {
    return Empresa.find(id)
  }

  // Actualizar empresa
  async actualizar(id: number, datos: any) {
    const empresa = await Empresa.findOrFail(id)
    empresa.merge(datos)
    await empresa.save()
    return empresa
  }

  // Eliminar empresa
  async eliminar(id: number) {
    const empresa = await Empresa.findOrFail(id)
    await empresa.delete()
    return 'Empresa eliminada'
  }

  // Conteo de empresas
  async conteo() {
    return Empresa.query().count('* as total')
  }
}
