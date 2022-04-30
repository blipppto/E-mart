import axios from 'axios'

export const FETCH_PRODUCT = 'fetch_product'
const baseUrl = process.env.REACT_APP_BACKEND_API

const fetchProduct = async(id) => {
    const url = `${baseUrl}/${id}`
    const result = await axios.get(url)

    return (dispatch) => {
        result.then(({data: {foundProduct}}) => {
            dispatch({
                type: FETCH_PRODUCT,
                payload: foundProduct
            })
        })
    }
}

export default fetchProduct