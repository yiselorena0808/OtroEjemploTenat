import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'gestion_epp_productos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('gestion_id').unsigned().references('id').inTable('gestion_epp')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable()
      table.integer('producto_id').unsigned().references('id_producto').inTable('productos')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable()
      table.integer('cantidad').defaultTo(1)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
