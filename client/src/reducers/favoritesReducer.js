import { FETCH_FAVORITES } from '../actions/types'; 

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_FAVORITES: 
            return { ...state, favorites: action.payload }
        default:
            return state
    }
}