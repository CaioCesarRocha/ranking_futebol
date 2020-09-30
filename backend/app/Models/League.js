'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class League extends Model {

    clubes(){
        return this
            .belongsToMany('App/Models/Clube')
            .pivotTable('league_clube')         
    }
}

module.exports = League
