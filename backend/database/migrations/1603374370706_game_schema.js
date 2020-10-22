'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.integer('rodada_id').references('id').inTable('rounds').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('league_id').references('id').inTable('leagues').onUpdate('CASCADE').onDelete('CASCADE')     
      table.integer('mandante_id').notNullable()
      table.integer('visitante_id').notNullable()
      table.integer('golsMandante').notNullable()
      table.integer('golsVisitante').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema
