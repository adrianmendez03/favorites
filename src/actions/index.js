import Axios from 'axios';
import { 
    SIGN_IN, 
    SIGN_OUT,
    FETCH_USERS
} from './types';

export const signIn = (userId, userName) => {
    return {
        type: SIGN_IN,
        payload: { userId, userName }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const fetchUsers = () => async dispatch => {
    const response = await Axios.get('http://localhost:5000/users');

    dispatch({ type: FETCH_USERS, payload: response.data })
}