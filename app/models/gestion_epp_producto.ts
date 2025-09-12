import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class GestionEppProducto extends BaseModel {
  public static table = 'gestion_epp_productos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare gestion_id: number

  @column()
  declare producto_id: number

  @column()
  declare cantidad: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
