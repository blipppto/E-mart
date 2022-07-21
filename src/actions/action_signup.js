import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useAlert} from 'react-alert'


export const REGISTER = 'register'

const url = `${process.env.REACT_APP_BACKEND_API}/signup`

export function useRegisterUser() {
    const navigate = useNavigate()
    const alert = useAlert()

    const registerUser = (values) => {
        return async (dispatch) => {
            try {
                const res = await axios.post(url, values, {
                    headers: { 'content-type': 'application/json' }
                })


                window.localStorage.setItem('token', `${res.data.token}`)

                dispatch({
                    type: REGISTER,
                    payload: res.data.user
                })
                navigate('/')
            } catch (err) {
                navigate('/signIn')
                alert.error(err.response.data.message)
                
            }
        }

    }
    
    //what hook returns
    return (
        registerUser
    )
}