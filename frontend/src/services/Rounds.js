import api from './api'

export default{

    store: (round) => {     //-> passar as info do formulario e salvar no banco
        return api.post('rounds', round)
    },
}