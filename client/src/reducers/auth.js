import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT
}
from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function authReg(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading: false,
                user:payload
            }
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            //if register is a success we want token to be stored in local storage
            localStorage.setItem('token', payload.token)
            return {
               ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            case AUTH_ERROR:
                case LOGIN_FAIL:
                    case LOGOUT:
                        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return {
               ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}