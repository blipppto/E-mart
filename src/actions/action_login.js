import axios from 'axios'



export const LOGIN = 'login'
const url = `${process.env.REACT_APP_BACKEND_API}/login`

export default function login(values, callback) {

    return async (dispatch) => {
        
            const res = await axios.post(url, values,{
                headers: {'content-type' : 'application/json'}
            })

            console.log(res)
          
            window.localStorage.setItem('token', `${res.token}`)
            callback()
    
            dispatch({
                type: LOGIN,
                payload: res.data.user
            })
       
      
    }
}