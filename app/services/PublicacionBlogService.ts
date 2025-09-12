import PublicacionBlog from '#models/publicacion_blog'

class PublicacionBlogService {
  async crear(empresaId:number,datos: any) {
    const blog = await PublicacionBlog.create({
      ...datos,
      id_empresa: empresaId,
    })

    return blog
  }

  async listar(empresaId: number) {
    return await PublicacionBlog.query().where('id_empresa', empresaId)
  }

  async listarId(id: number, empresaId: number) {
    return await PublicacionBlog.query()
    .where('id', id)
    .andWhere('id_empresa', empresaId)
    .first()
  }

  async actualizar(id:number, empresaId:number, datos: any) {
    const blog = await PublicacionBlog.findBy('id', id)
    if(!blog){
      return {error: 'publicación no encontrada'}
    }

    if (empresaId && blog.id_empresa !== empresaId) {
      return { error: 'No autorizado para actualizar esta publicación' }
    }

    blog.merge(datos)
    await blog.save()
    return blog
  }

  async eliminar(id: number, empresaId: number) {
    const blog = await PublicacionBlog.query()
    .where('id', id)
    .andWhere('id_empresa', empresaId)
    .first()

    if (!blog) {
      return { error: 'Publicación no encontrada o no autorizada' }
    }

    await blog.delete()
    return { mensaje: 'Publicación eliminada correctamente' }
  }

  async conteo() {
    const blogs = await PublicacionBlog.query()
    return {
      total: blogs.length,
      blogs,
    }
  }
}

export default PublicacionBlogService