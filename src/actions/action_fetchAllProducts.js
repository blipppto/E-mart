import axios from 'axios'

export const  FETCH_ALL_PRODUCTS = 'fetch_products_under_category'
const baseUrl = process.env.REACT_APP_BACKEND_API

const fetchAllProducts = async() => {
    const url = `${baseUrl}`
    const result = await axios.get(url)

    return (dispatch) => {
        result.then(({data: {allProducts}}) => {
            dispatch({
                type: FETCH_ALL_PRODUCTS,
                payload: allProducts
            })
        })
    }
}

export default fetchAllProducts