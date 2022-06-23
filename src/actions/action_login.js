import axios from 'axios'


export const LOGIN = 'login'
const url = process.env.REACT_APP_LOGIN_API

export default function login(values, callback) {

    return async (dispatch) => {
        const res = await axios.post(url, values,{
            headers: {'content-type' : 'application/json'}
        })
        window.localStorage.setItem('token', `${res.data.token}`)
        callback()

        dispatch({
            type: LOGIN,
            payload: res
        })
    }
}