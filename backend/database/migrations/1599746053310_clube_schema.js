'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClubeSchema extends Schema {
  up () {
    this.create('clubes', (table) => {
      table.increments()
      table.string('nome', 100).notNullable().unique()
      table.string('estado', 100).notNullable()
      table.string('historico', 1000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clubes')
  }
}

module.exports = ClubeSchema
