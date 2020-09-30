'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeagueClubeSchema extends Schema {
  up () {
    this.create('league_clube', (table) => {
      table.increments()
      table.integer('league_id').references('id').inTable('leagues').onUpdate('CASCADE')
      table.integer('clube_id').references('id').inTable('clubes').onUpdate('CASCADE')
      table.timestamps()
    })
  }
  down () {
    this.drop('league_clube')
  }
}

module.exports = LeagueClubeSchema
