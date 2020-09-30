'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeagueSchema extends Schema {
  up () {
    this.create('leagues', (table) => {
      table.increments()
      table.string('nome', 200).notNullable().unique()
      table.string('formato').notNullable()
      table.integer('numParticipantes').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('leagues')
  }
}

module.exports = LeagueSchema
