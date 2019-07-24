import axios from 'axios'

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