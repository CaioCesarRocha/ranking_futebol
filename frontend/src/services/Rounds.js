import api from './api'

export default{

    index: (Params) => {// -> carrega a ListRounds como index
        return api.get('rounds', { params: {
            page: Params.page,
            itemsPerPage: Params.itemsPerPage,
            orderBy: Params.orderBy,
            sortDesc: Params.sortDesc,
            idLeague: Params.idLeague
        }})
        
    },
    
    search: (searchParams) => {     //--> carrega a ListRounds com os dados passados na pesquisa
        return api.get('rounds/search', { params: {
            page: searchParams.page,
            itemsPerPage: searchParams.itemsPerPage,
            orderBy: searchParams.orderBy,
            sortDesc: searchParams.sortDesc,
            term: searchParams.searchText,
            idLeague: searchParams.idLeague
        }})
    },

    store: (round) => {     //-> passar as info do formulario e salvar no banco
        return api.post('rounds', round)
    },

    update:(id, round) =>{
        return api.put(`rounds/${id}`, round)
    },

    info: (id) => {
        return api.get(`rounds/${id}`)
    },

}