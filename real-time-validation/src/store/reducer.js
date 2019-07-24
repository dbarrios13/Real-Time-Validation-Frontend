import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,

} from './actions'

const initialState = {
    loggingIn: false,
    loggedIn: false,
    signingUp: false,
    signedUp: false,
    error: '',
    token: ''
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true
            }
        case LOGIN_SUCCESS: 
            return {
                ...state,
                token: action.payload.token,
                loggedIn: true,
                loggingIn: false
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                error: action.payload
            }
        case SIGNUP_START:
            return {
                ...state,
                signingUp: true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signingUp: false,
                signedUp: true
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                signingUp: false,
                error: action.payload
            }
        default:
            return state
    }
}