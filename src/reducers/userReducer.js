import _ from 'lodash';
import { 
    FETCH_USERS,
    DELETE_USER
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_USERS: 
            return {...state, users: action.payload }
        case DELETE_USER:
            return _.omit(state, action.payload)
        default:
            return state
    }
}