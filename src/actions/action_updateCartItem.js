import axios from 'axios'

export const UPDATE_CART_ITEM = 'update_cart_item'
export const UPDATE_CART_ITEM_USER = 'update_cart_item_user'


const baseUrl = process.env.REACT_APP_BACKEND_API

const updateCartItem = (cartItem, qty) => {
    const { _id } = cartItem
    const url = `${baseUrl}/${_id}`
    cartItem.qty = qty

    const data = JSON.parse(window.localStorage.getItem('cart'))
    const token = JSON.parse(window.localStorage.getItem('token'))

    if (!token) {
        const cart = { ...data, [_id]: cartItem }
        window.localStorage.setItem('cart', JSON.stringify(cart))

        return {
            type: UPDATE_CART_ITEM,
            payload: cartItem
        }

    } else {

        return async (dispatch) => {
            const newValue = { qty }
            const result = await axios.patch(url, newValue, {
                headers: {
                    'content-type': 'application/json'
                }
            })

            dispatch({
                type: UPDATE_CART_ITEM_USER,
                payload: result.data.updatedCartItem
            })

        }
    }
}

export default  updateCartItem