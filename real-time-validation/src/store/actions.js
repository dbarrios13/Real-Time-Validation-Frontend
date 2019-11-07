import axios from 'axios'

// const link = 'https://real-time-validation.herokuapp.com'
const link = 'http://localhost:5500'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START })
    axios.post(`${link}/login`, creds)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL, payload: err})
        })
}

export const SIGNUP_START = 'SIGNUP_START'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

export const signup = newUser => dispatch => {
    dispatch({ type: SIGNUP_START })
    axios.post(`${link}/signup`, newUser)
        .then(res => {
            dispatch({ type: SIGNUP_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: SIGNUP_FAIL, payload: err})
        })
}

export const EMAIL_CHECK_START = 'EMAIL_CHECK_START'
export const EMAIL_CHECK_SUCCESS  = 'EMAIL_CHECK_SUCCESS'
export const EMAIL_CHECK_FAIL = 'EMAIL_CHECK_FAIL'

export const emailCheck = email => dispatch => {
    dispatch({ type: EMAIL_CHECK_START })
    axios.get(`${link}/auth/email/${email}`)
        .then(res => {
            dispatch({ type: EMAIL_CHECK_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: EMAIL_CHECK_FAIL, payload: err })
        })
}

export const GET_USERNAMES_START = 'GET_USERNAMES_START'
export const GET_USERNAMES_SUCCESS = 'GET_USERNAMES_SUCCESS'
export const GET_USERNAMES_FAIL = 'GET_USERNAMES_FAIL'

export const getUsernames = () => dispatch => {
    dispatch({ type: GET_USERNAMES_START })
    axios.get(`${link}/auth/usernames`)
        .then(res => {
            dispatch({ type: GET_USERNAMES_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: GET_USERNAMES_FAIL, payload: err })
        })
}