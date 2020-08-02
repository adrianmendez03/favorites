import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    users: userReducer,
    favorites: favoritesReducer
})