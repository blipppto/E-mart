import {combineReducers} from '@reduxjs/toolkit'
import productsReducer from './productsReducer'
import itemsInCartReducer from './itemsInCartReducer'
import productsUnderCategoryReducer from './productsUnderCategoryReducer'
import fetchedProductReducer from './fetchedProductsReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: itemsInCartReducer,
    productsUnderCategory: productsUnderCategoryReducer,
    fetchedProducts: fetchedProductReducer,
    user: userReducer,
    
})

export default rootReducer