import axios from 'axios'

export const CLEAR_CART = 'CLEAR_CART'
const url = `${process.env.REACT_APP_BACKEND_API}/paystack/pay`



const checkoutCart = (email,firstName, lastName, amount) => {
    return async(dispatch) => {
        const values = {email, firstName, lastName, amount}
        const result = await axios.post(url, values, {
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log(result)
            // dispatch({
            //     type: CLEAR_CART,
            //     payload: result.data.reference
            // })
    }
}

export default checkoutCart