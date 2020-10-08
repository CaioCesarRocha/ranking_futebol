import api from './api'

export default{

    index: (paginationParams) => {// -> carrega a ListClub como index
        return api.get('leagues', { params: {
            page: paginationParams.page,
            itemsPerPage: paginationParams.itemsPerPage,
            orderBy: paginationParams.orderBy,
            sortDesc: paginationParams.sortDesc
        }})
    },
    
    search: (searchParams) => {     //--> carrega a ListClub com os dados passados na pesquisa
        return api.get('leagues/search', { params: {
            page: searchParams.page,
            itemsPerPage: searchParams.itemsPerPage,
            orderBy: searchParams.orderBy,
            sortDesc: searchParams.sortDesc,
            term: searchParams.searchText
        }})
    },

    show: (id) => {      //--> exibir a editLeague
        return api.get(`leagues/${id}`)
    },

    store: (league) => {     //-> passar as info do formulario e salvar no banco
        return api.post('leagues', league)
    },

    delete: (id) => {
        return api.delete(`leagues/${id}`)
    }
}