'use strict'

const League = use("App/Models/League");
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with leagues
 */
class LeagueController {
  /**
   * Show a list of all leagues.
   * GET leagues
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
      const leagues = await Database
        .from('leagues')
        .orderBy(pagination.orderBy, pagination.sortDesc)
        .paginate(page, itemsPerPage)

      return response.status(200).json(leagues)
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
          const leagues = await Database
            .from('leagues')
            .where('nome', 'ILIKE', '%'+search.term+'%')
            .orderBy(search.orderBy, search.sortDesc)
            .paginate(page, itemsPerPage)

          return response.status(200).json(leagues)
      }
      catch(err){
          return response.status(500).json({ message: 'Ocorreu um erro interno' })
      }  
  }


  /**
   * Render a form to be used for creating a new league.
   * GET leagues/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new league.
   * POST leagues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { nome, formato, numParticipantes, selectedClubes} = await request.post();
     
    const league = await League.create({
      nome,
      formato,
      numParticipantes,
    });
   
    
    selectedClubes.forEach(async (selectedClubes) => {     
        await league.clubes().attach([selectedClubes], row =>{
          row.pontos = 0
          row.jogos = 0
          row.vitorias = 0
          row.empates = 0
          row.derrotas = 0
          row.golsFeitos = 0
          row.golsSofridos = 0
          row.saldoGols = 0
        })                
    });
    
    league.selectedClubes = await league.clubes().fetch();
    return league
  }

  /**
   * Display a single league.
   * GET leagues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const league = await League.findOrFail(params.id)

    return league
  }

  /**
   * Render a form to update an existing league.
   * GET leagues/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update league details.
   * PUT or PATCH leagues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a league with id.
   * DELETE leagues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    
    const deleteLeague = await Database
    
    .raw(`delete from leagues as l
    where l.id = ${params.id}`)
    return deleteLeague.rows   
  }
}

module.exports = LeagueController
