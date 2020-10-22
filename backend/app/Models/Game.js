'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
    static get table () {
        return 'games' 
    }

    rounds() {
        return this.belongsTo('App/Models/Round')
      }
}

module.exports = Game
