import { FETCH_ALL_PRODUCTS } from '../actions/action_fetchAllProducts'
import { FETCH_PRODUCT } from '../actions/action_fetchProduct'
import _ from 'lodash'

export default function productsReducer(state = {}, action){
    switch(action.type){
        case FETCH_ALL_PRODUCTS : return _.mapKeys(action.payload, '_id')
        case FETCH_PRODUCT: return  {...state, [action.payload._id]: action.payload}
        default: return state
    }
}