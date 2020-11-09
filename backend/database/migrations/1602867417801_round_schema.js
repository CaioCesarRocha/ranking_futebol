'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoundSchema extends Schema {
  up () {
    this.create('rounds', (table) => {
      table.increments()
      table.integer('league_id').references('id').inTable('leagues').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('league_nome').notNullable()
      table.string('nome', 300).notNullable()      
      table.timestamps()
    })
  }

  down () {
    this.drop('rounds')
  }
}

module.exports = RoundSchema
