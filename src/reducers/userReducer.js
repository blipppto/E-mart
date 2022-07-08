import { LOGIN } from "../actions/action_login";

const initialState = {
    firstName: null,
    lastName: null,
    email: null,
    isLoggedIn: false
} 
export default function userReducer(state = initialState,action){
    switch(action.type){
        case LOGIN: return {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            isLoggedIn: true
        }
        default:return state 
    }
}