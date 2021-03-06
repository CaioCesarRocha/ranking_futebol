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
Route.get('/clubes/:id', 'ClubeController.show'); //-> edit
Route.get('/clubes/info/:id', 'ClubeController.info');
Route.put('/clubes/:id', 'ClubeController.update');
Route.get('/listClubes','ClubeController.listClubes'); //-> list pra Showclubes
Route.get('/clubes/searchClubes', 'ClubeController.searchClubes');

Route.get('/leagues', 'LeagueController.index');
Route.post('/leagues', 'LeagueController.store');
Route.get('/leagues/search', 'LeagueController.search');
Route.get('/leagues/:id', 'LeagueController.show');
Route.delete('/leagues/:id', 'LeagueController.destroy');

Route.get('/rounds', 'RoundController.index');
Route.post('/rounds', 'RoundController.store');
Route.get('/rounds/search', 'RoundController.search');
Route.get('/rounds/:id', 'RoundController.info');
Route.put('/rounds/:id', 'RoundController.update');

Route.get('/games', 'GameController.index');
Route.get('/games/search', 'GameController.search');
Route.get('/games/info/:id', 'GameController.info');
Route.post('/games', 'GameController.store');
Route.put('/games/:id', 'GameController.update');
Route.delete('/games/:id', 'GameController.destroy');

Route.get('/leagueClubes/:id', 'LeagueClubeController.show');
Route.get('/leagueClubes/info/:id', 'LeagueClubeController.info');
Route.put('/leagueClubes/:id', 'LeagueClubeController.update');




//Route.resource('leagueClubes', 'LeagueClubeController').apiOnly();
//Route.resource('clubes', 'ClubeController').apiOnly();
//Route.resource('leagues', 'LeagueController').apiOnly();





