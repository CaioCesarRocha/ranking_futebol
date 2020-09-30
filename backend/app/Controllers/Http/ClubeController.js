'use strict'

const Clube = use("App/Models/Clube");
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clubes
 */
class ClubeController {
  /**
   * Show a list of all clubes.
   * GET clubes
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
      const clubes = await Database
        .from('clubes')
        .orderBy(pagination.orderBy, pagination.sortDesc)
        .paginate(page, itemsPerPage)

      return response.status(200).json(clubes)
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
          const clubes = await Database
            .from('clubes')
            .where('nome', 'ILIKE', '%'+search.term+'%')
            .orderBy(search.orderBy, search.sortDesc)
            .paginate(page, itemsPerPage)

          return response.status(200).json(clubes)
      }
      catch(err){
          return response.status(500).json({ message: 'Ocorreu um erro interno' })
      }  
  }

  /**
   * Render a form to be used for creating a new clube.
   * GET clubes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new clube.
   * POST clubes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(["nome", "estado","historico"]);
    
    try
    {
      const clube = await Clube.create(data);
      return clube;
    }
    catch(err){
      if(err.constraint == 'clubes_nome_unique')
      return response.status(409).json({ message: 'Este clube já existe'})
    else
      return response.status(500).json({ message: 'Ocorreu um erro interno' }) 
    }

  }

  /**
   * Display a single clube.
   * GET clubes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const clube = await Clube.findOrFail(params.id)

    return clube
  }

  /**
   * Render a form to update an existing clube.
   * GET clubes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update clube details.
   * PUT or PATCH clubes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const clube = await Clube.findOrFail(params.id);
    const data = request.only(["nome", "estado","historico"]);
    
    clube.merge(data);
    await clube.save();
    
    return clube
  }
  /**
   * Selected clubes details.
   * PUT or PATCH clubes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async selectClubes ({ request, response, view }) {

    try{
      const clubes = await Database
      .from('clubes')
      .orderBy('nome','asc')
      return response.status(200).json(clubes)
    }
    catch(err){
      return response.status(500).json({ message: 'Ocorreu um erro interno' }) 
    }
   
  }

  /**
   * Delete a clube with id.
   * DELETE clubes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const clube = await Clube.findOrFail(params.id);
    
    await clube.delete();
  }


}

module.exports = ClubeController
