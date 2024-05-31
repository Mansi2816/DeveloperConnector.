import { SET_ALERT, REMOVE_ALERT } from '../actions/types';


//by default action will contain 2 things: type and payload 
const initialState = [];

export default function alertReducer(state = initialState, action) { 
    const {type, payload} = action
   
    
    switch(type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}
