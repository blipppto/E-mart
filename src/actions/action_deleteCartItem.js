import axios from "axios";

export const DELETE_CART_ITEM = 'delete_cart_item'
export const DELETE_CART_ITEM_USER = 'delete_cart_item_user'

const baseUrl = process.env.REACT_APP_BACKEND_API


const deleteCartItem = (id) => {
    const url = `${baseUrl}/cart/remove`
    const token = JSON.parse(window.localStorage.getItem('token'))
    const cart = JSON.parse(window.localStorage.getItem('cart'))

    if (!token) {
        delete cart[id]
        window.localStorage.setItem('cart', JSON.stringify(cart))

        return {
            type: DELETE_CART_ITEM,
            payload: id
        }

    } else {

        return async (dispatch) => {
            await axios.delete(url)

            dispatch({
                type: DELETE_CART_ITEM_USER,
                payload: id
            })
        }
    }
}

export default deleteCartItem