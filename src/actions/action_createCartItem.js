import axios from 'axios'


export const CREATE_CART_ITEM_USER = 'cart_item_user'
export const CREATE_CART_ITEM = 'cart_item'

const baseUrl = process.env.REACT_APP_BACKEND_API


const createCartItem = (product, selectedSize, image,qty) => {
    const url = `${baseUrl}/cart/add`
    const { name, price, _id } = product
    const valuesforDB = {name, price, image, size: selectedSize, qty}
    const valuesforLS =  {_id: _id, name, price, image, size: selectedSize, qty}


    // const data = JSON.parse(window.localStorage.getItem('cart'))
    const token = JSON.parse(window.localStorage.getItem('token'))

    if (!token) {
       
        return {
            type: CREATE_CART_ITEM,
            payload: valuesforLS
        }
    
    } else {

        return async (dispatch) => {
            const result = await axios.post(url, valuesforDB,
                {
                    headers: { 'content-type': 'application/json' }
                })

            dispatch({
                type: CREATE_CART_ITEM_USER,
                payload: result.data.newCartItem
            })
        }
    }

}
export default createCartItem