import api from './api'

export default{
    index: (paginationParams) => {
        return api.get('clubes', { params: {
            page: paginationParams.page,
            itemsPerPage: paginationParams.itemsPerPage,
            orderBy: paginationParams.orderBy,
            sortDesc: paginationParams.sortDesc
        }})
    },

    list: (params) => { //--> lista o clubes na ShowCLubes
        return api.get('listClubes', {params: {
            page: params.page,
        }})
    },
    searchClubes: (searchParams) => {  //--> lista o clube com a pesquisa na showCLubes
        return api.get('clubes/searchClubes', { params: {
            page: searchParams.page,
            term: searchParams.searchText,
        }})
    },
    
    store: (clube) => {
        return api.post('clubes', clube)
    },
     
    update: (id, clube) => {
        return api.put(`clubes/${id}`, clube)
    },
    show: (id) => {
        return api.get(`clubes/${id}`)
    },

    info: (id) =>{
        return api.get(`clubes/info/${id}`)
    },
    
    search: (searchParams) => {
        return api.get('clubes/search', { params: {
            page: searchParams.page,
            itemsPerPage: searchParams.itemsPerPage,
            orderBy: searchParams.orderBy,
            sortDesc: searchParams.sortDesc,
            term: searchParams.searchText
        }})
    },

    selectClubes: () =>{
        return api.get('clubes/selectClubes')
    }
}