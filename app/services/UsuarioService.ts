import Usuario from '#models/usuario'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'sstrict'

export default class UsuarioService {
  async register(
    id_empresa: number,
    id_area: number,
    nombre: string,
    apellido: string,
    nombre_usuario: string,
    correo_electronico: string,
    cargo: string,
    contrasena: string,
    confirmacion: string
  ) {
    if (contrasena !== confirmacion) throw new Error('Contraseñas no coinciden')

    const hash = await bcrypt.hash(contrasena, 10)
    const usuario = await Usuario.create({
      id_empresa, id_area, nombre, apellido,
      nombre_usuario, correo_electronico, cargo,
      contrasena: hash
    })
    return { mensaje: 'Usuario creado', usuario }
  }

  async login(correo_electronico: string, contrasena: string) {
    const usuario = await Usuario.query().where('correo_electronico', correo_electronico).first()
    if (!usuario) throw new Error('Usuario no encontrado')

    const valid = await bcrypt.compare(contrasena, usuario.contrasena)
    if (!valid) throw new Error('Contraseña incorrecta')

    const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '1d' })
    return { mensaje: 'Login exitoso', token, usuario }
  }

  async listar(empresaId: number) {
    return Usuario.query().where('id_empresa', empresaId)
  }

  async listarId(id: number, empresaId: number) {
    return Usuario.query().where('id', id).andWhere('id_empresa', empresaId).first()
  }
}
