import api from './api'

export default{

    index: (paginationParams) => {// -> carrega a ListRounds como index
        return api.get('rounds', { params: {
            page: paginationParams.page,
            itemsPerPage: paginationParams.itemsPerPage,
            orderBy: paginationParams.orderBy,
            sortDesc: paginationParams.sortDesc
        }})
    },
    
    search: (searchParams) => {     //--> carrega a ListRounds com os dados passados na pesquisa
        return api.get('rounds/search', { params: {
            page: searchParams.page,
            itemsPerPage: searchParams.itemsPerPage,
            orderBy: searchParams.orderBy,
            sortDesc: searchParams.sortDesc,
            term: searchParams.searchText
        }})
    },

    store: (round) => {     //-> passar as info do formulario e salvar no banco
        return api.post('rounds', round)
    },
}