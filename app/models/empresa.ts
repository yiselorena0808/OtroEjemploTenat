import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  declare id_empresa: number

  @column()
  declare nombre: string

  @column()
  declare direccion: string

  @column()
  declare nit:string

  @column()
  declare estado:boolean

  @column()
  declare esquema: string | null

  @column()
  declare alias: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}