import { useState } from "react"
import useAuthContext from "./useAuthContext"


const useLogin = ()=>{

    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const {dispatch}  = useAuthContext()

    const login = async(email, password)=>{

        setIsLoading(true)
        setError(null)

        const response = await fetch('h/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({email, password})
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error)
            setIsLoading(false)
        }
        if (response.ok) {
            
            // SAVE USER TO LOCAL STORAGE
            localStorage.setItem('user', JSON.stringify(data))

            dispatch({type: 'LOG_IN', payload: data})
            console.log('LOGIN SUCCESS', data);
            setIsLoading(false)
            setError(null)
        }
    }
    return{ login, isLoading, error}
}
export default useLogin;