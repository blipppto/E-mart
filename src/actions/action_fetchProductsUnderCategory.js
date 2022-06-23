import axios from 'axios'

export const FETCH_PRODUCTS_UNDER_CATEGORY = 'fetch_products_under_category'
const baseUrl = process.env.REACT_APP_BACKEND_API

const fetchProductsUnderCategory = categoryValue => {
    const url = `${baseUrl}/category?category=${categoryValue}`

    return async(dispatch) => {
        const result = await axios.get(url)
            dispatch({
                type: FETCH_PRODUCTS_UNDER_CATEGORY,
                payload: result.data.foundProducts
            })
    }
}

export default fetchProductsUnderCategory