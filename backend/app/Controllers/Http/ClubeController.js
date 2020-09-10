'use strict'

const Clube = use("App/Models/Clube");

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
    const clubes = await Clube.all();
    
    return clubes;
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
    
    const clube = await Clube.create(data);
    
    return clube;
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
