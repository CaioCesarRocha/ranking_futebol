import api from './api'

export default {
  
    show: (id) => {    // --> exibir os clubes lá no edit league
        return api.get(`leagueClubes/${id}`)
    },

    info: (id) => { // --> pegar as informações dos clubes(P/J/V/E/D)
        return api.get(`leagueClubes/info/${id}`)
    },

    update:(id, pontos) =>{
        return api.put(`leagueClubes/${id}`, pontos)
    }
    
}