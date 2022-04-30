import axios from 'axios'

export const FETCH_PRODUCTS_UNDER_CATEGORY = 'fetch_products_under_category'
const baseUrl = process.env.REACT_APP_BACKEND_API

const fetchProductsUnderCategory = async(categoryValue) => {
    const url = `${baseUrl}/category?category=${categoryValue}`
    const result = await axios.get(url)

    return (dispatch) => {
        result.then(({data: {foundProducts}}) => {
            console.log(foundProducts)
            dispatch({
                type: FETCH_PRODUCTS_UNDER_CATEGORY,
                payload: foundProducts
            })
        })
    }
}

export default fetchProductsUnderCategory