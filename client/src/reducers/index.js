import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';

export default combineReducers({
    auth: authReducer,
    users: userReducer,
    favorites: favoritesReducer
})