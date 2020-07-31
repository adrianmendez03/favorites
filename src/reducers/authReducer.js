import { SIGN_IN, SIGN_OUT } from '../actions/types';

// given initial state of null to avoid undefined errors

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    userName: null
};

export default (state = INITIAL_STATE, action) => {
    switch ( action.type ) {
        case SIGN_IN:
            // updates state when signed in to hold user id and name
            return { 
                ...state, 
                isSignedIn: true, 
                userId: action.payload.userId,
                userName: action.payload.userName,
            };
        case SIGN_OUT:
            // updates state when signing out to not carry data from prev user
            return { 
                ...state, 
                isSignedIn: false,
                userId: null,
                userName: null
            }
        default:
            return state;
    }
};