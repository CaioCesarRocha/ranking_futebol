'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/clubes', 'ClubeController.index');
Route.get('/clubes/search', 'ClubeController.search');
Route.get('/clubes/selectedClubes', 'ClubeController.selectedClubes');
Route.resource('clubes', 'ClubeController').apiOnly();





