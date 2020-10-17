'use strict'

const Round = use("App/Models/Round");
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rounds
 */
class RoundController {
  /**
   * Show a list of all rounds.
   * GET rounds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const pagination = request.get()

    let page = pagination.page || 1
    let itemsPerPage = pagination.itemsPerPage || 10
    
    if(typeof pagination.orderBy === 'undefined' || pagination.orderBy == 'null')
        pagination.orderBy = 'nome'
    
    if(typeof pagination.sortDesc === 'undefined' || pagination.sortDesc == 'null' || pagination.sortDesc == 'false')
       pagination.sortDesc = 'asc'   
    else 
       pagination.sortDesc = 'desc'    

    try{
      const rounds = await Database
        .from('rounds')
        .orderBy(pagination.orderBy, pagination.sortDesc)
        .paginate(page, itemsPerPage)

      return response.status(200).json(rounds)
    }
    catch(err){
      return response.status(500).json({ message: 'Ocorreu um erro interno' })
    }
  }



  
  async search ({ request, response }) {
    const search = request.get()

      let page = search.page || 1
      let itemsPerPage = search.itemsPerPage || 10
      
      if(typeof search.orderBy === 'undefined' || search.orderBy == 'null')
        search.orderBy = 'nome'
      
      if(typeof search.sortDesc === 'undefined' || search.sortDesc == 'null' || search.sortDesc == 'false')
        search.sortDesc = 'asc'   
      else 
        search.sortDesc = 'desc'  
          
      try{
          const rounds = await Database
            .from('rounds')
            .where('nome', 'ILIKE', '%'+search.term+'%')
            .orderBy(search.orderBy, search.sortDesc)
            .paginate(page, itemsPerPage)

          return response.status(200).json(rounds)
      }
      catch(err){
          return response.status(500).json({ message: 'Ocorreu um erro interno' })
      }  
  }

  /**
   * Render a form to be used for creating a new round.
   * GET rounds/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new round.
   * POST rounds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { nome, league_id, league_nome } = await request.post();
     
    const rodada = await Round.create({
      nome,
      league_id,
      league_nome
    });

    return rodada
  }

  /**
   * Display a single round.
   * GET rounds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing round.
   * GET rounds/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update round details.
   * PUT or PATCH rounds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a round with id.
   * DELETE rounds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RoundController
