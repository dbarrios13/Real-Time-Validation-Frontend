import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    EMAIL_CHECK_START,
    EMAIL_CHECK_SUCCESS,
    EMAIL_CHECK_FAIL,
    GET_USERNAMES_START,
    GET_USERNAMES_SUCCESS,
    GET_USERNAMES_FAIL,
} from './actions'

const initialState = {
    loggingIn: false,
    loggedIn: false,
    signingUp: false,
    signedUp: false,
    checkingEmail: false,
    gettingUsernames: false,
    usernames: [],
    emailTaken: false,
    error: '',
    token: ''
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                error: '',
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
                signingUp: true,
                error: ''
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
        case EMAIL_CHECK_START:
            return {
                ...state,
                checkingEmail: true,
                error: ''
            }
        case EMAIL_CHECK_SUCCESS:
            return {
                ...state,
                checkingEmail: false,
                emailTaken: action.payload
            }
        case EMAIL_CHECK_FAIL:
            return {
                ...state,
                checkingEmail: false,
                error: action.payload
            }
        case GET_USERNAMES_START:
            return {
                ...state,
                error: '',
                gettingUsernames: true
            }
        case GET_USERNAMES_SUCCESS:
            return {
                ...state,
                gettingUsernames: false,
                usernames: action.payload
            }
        case GET_USERNAMES_FAIL:
            return {
                ...state,
                error: action.payload,
                gettingUsernames: false
            }
        default:
            return state
    }
}