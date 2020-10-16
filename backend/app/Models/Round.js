'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Round extends Model {
    static get table () {
        return 'rounds' 
    }

    leagues() {
        return this.belongsTo('App/Models/League')
      }
}

module.exports = Round
