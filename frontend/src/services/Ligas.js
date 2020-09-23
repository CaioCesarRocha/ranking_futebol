import api from './api'

export default{
    store: (league) => {
        return api.post('leagues', league)
    },
}