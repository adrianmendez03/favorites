import Axios from 'axios';
import History from '../History';
import { 
    SIGN_IN, 
    SIGN_OUT,
    FETCH_USERS,
    DELETE_USER,
    FETCH_FAVORITES
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

export const deleteUser = id => async dispatch => {
    await Axios.delete(`http://localhost:5000/users/${id}`);

    dispatch({ type: DELETE_USER, payload: id });
    History.push('/');
}

export const fetchFavorites = id => async dispatch => {
    const response = await Axios.get(`http://localhost:5000/favorites/${id}`);

    dispatch({ type: FETCH_FAVORITES, payload: response.data })
}