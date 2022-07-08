import axios from 'axios'

export const FETCH_PRODUCT = 'fetch_product'
const baseUrl = process.env.REACT_APP_PRODUCT_API

const fetchProduct = id => {
    const url = `${baseUrl}/${id}`

    return async(dispatch) => {
        const result = await axios.get(url)
            dispatch({
                type: FETCH_PRODUCT,
                payload: result.data.foundProduct
            })
    }
}

export default fetchProduct