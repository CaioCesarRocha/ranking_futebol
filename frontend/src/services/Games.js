import api from './api'

export default{

    index: (Params) => {// -> carrega a ListRounds como index
        return api.get('games', { params: {
            page: Params.page,
            itemsPerPage: Params.itemsPerPage,
            orderBy: Params.orderBy,
            sortDesc: Params.sortDesc,
            idRodada: Params.idRodada
        }})
        
    },
    
    search: (searchParams) => {     //--> carrega a ListRounds com os dados passados na pesquisa
        return api.get('games/search', { params: {
            page: searchParams.page,
            itemsPerPage: searchParams.itemsPerPage,
            orderBy: searchParams.orderBy,
            sortDesc: searchParams.sortDesc,
            term: searchParams.searchText,
            idRodada: searchParams.idRodada
        }})
    },
    
    store: (game) => {     //-> passar as info do formulario e salvar no banco
        return api.post('games', game)
    },

    info: (id) => {   //pegar as info do jogo no banco
        return api.get(`games/info/${id}`)
    },

}