'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Clube extends Model {

    leagues(){
        return this
            .belongsToMany('App/Models/League')
    }
}

module.exports = Clube
