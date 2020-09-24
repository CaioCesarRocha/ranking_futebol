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
     
    update: (id, clube) => {
        return api.put(`clubes/${id}`, clube)
    },
    show: (id) => {
        return api.get(`clubes/${id}`)
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

    selectedClubes: () =>{
        return api.get('clubes/selectedClubes')
    }
}