'use strict'

const LeagueClube = use("App/Models/LeagueClube");
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with leagueclubes
 */
class LeagueClubeController {
  /**
   * Show a list of all leagueclubes.
   * GET leagueclubes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new leagueclube.
   * GET leagueclubes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new leagueclube.
   * POST leagueclubes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single leagueclube.
   * GET leagueclubes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const nomeClubes = await Database
    
    .raw(`select c.nome, c.id
    from clubes as c 
    inner join league_clube as lc 
    on lc.clube_id = c.id
    where lc.league_id = ${params.id} `)
    return nomeClubes.rows
  }

  async info ({ params, request, response, view }) {

   const infoMandante = await Database
    .raw(`select c.pontos, c.vitorias, c.empates, c.derrotas, c.jogos, c.gmarcados, c.gsofridos, c.saldo
      from league_clube as c
      where c.clube_id = ${params.id}`)

    return infoMandante.rows
    
  }

  /**
   * Render a form to update an existing leagueclube.
   * GET leagueclubes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update leagueclube details.
   * PUT or PATCH leagueclubes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a leagueclube with id.
   * DELETE leagueclubes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LeagueClubeController
