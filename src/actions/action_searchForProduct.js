import axios from 'axios'

export const SEARCH_FOR_PRODUCT = 'search_for_product'
const baseUrl = process.env.REACT_APP_PRODUCT_API

const searchForProduct = name => {
    const url = `${baseUrl}/search?name=${name}`

    return async(dispatch) => {
        const result = await axios.get(url)
            dispatch({
                type: SEARCH_FOR_PRODUCT,
                payload: result.data.foundProduct
            })
    }
}

export default searchForProduct