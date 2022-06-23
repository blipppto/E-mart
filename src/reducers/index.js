import {combineReducers} from 'redux'
import productsReducer from './productsReducer'
import itemsInCartReducer from './itemsInCartReducer'
import productsUnderCategoryReducer from './productsUnderCategoryReducer'
import fetchedProductReducer from './fetchedProductsReducer'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: itemsInCartReducer,
    productsUnderCategory: productsUnderCategoryReducer,
    fetchedProducts: fetchedProductReducer
})

export default rootReducer