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
Route.post('/clubes', 'ClubeController.store');
Route.get('/clubes/search', 'ClubeController.search');
Route.get('/clubes/selectClubes', 'ClubeController.selectClubes');

Route.get('/leagues', 'LeagueController.index');
Route.post('/leagues', 'LeagueController.store');
Route.get('/leagues/search', 'LeagueController.search');


Route.resource('clubes', 'ClubeController').apiOnly();
Route.resource('leagues', 'LeagueController').apiOnly();





