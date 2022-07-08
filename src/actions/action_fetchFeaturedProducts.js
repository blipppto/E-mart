import axios from 'axios'

export const  FETCH_FEATURED_PRODUCTS = 'fetch_featured_products'
const baseUrl = process.env.REACT_APP_PRODUCT_API

const fetchFeaturedProducts = () => {
    const url = `${baseUrl}/featured`

    return async(dispatch) => {
      const result = await axios.get(url)
          dispatch({
              type: FETCH_FEATURED_PRODUCTS,
              payload: result.data.featuredProducts
          })
  }
}

export default fetchFeaturedProducts