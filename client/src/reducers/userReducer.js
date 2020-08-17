import _ from 'lodash';
import { 
    FETCH_USERS,
    FETCH_USER,
    UNFETCH_USER,
    DELETE_USER
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_USERS: 
            return {...state, users: action.payload }
        case FETCH_USER: 
            return {...state, user: action.payload }
        case UNFETCH_USER:
            return { ... state, user: {} }
        case DELETE_USER:
            return _.omit(state, action.payload)
        default:
            return state
    }
}