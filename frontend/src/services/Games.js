import api from './api'

export default{
    
    store: (game) => {     //-> passar as info do formulario e salvar no banco
        return api.post('games', game)
    },

}