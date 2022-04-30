import {combineReducers} from 'redux'
import productReducer from './ productsReducer'
import productsUnderCategoryReducer from './productsUnderCategoryReducer'

const rootReducer = combineReducers({
    products: productReducer,
    productsUnderCategory: productsUnderCategoryReducer 
})

export default rootReducer