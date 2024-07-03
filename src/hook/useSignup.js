
import { useState } from 'react'
import useAuthContext from './useAuthContext'

const useSignup = ()=>{


    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async(fullName, email, password)=>{

        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/auth/signup/',{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({fullName, email, password})
        })
    
        const data = await response.json()
    
        if (!response.ok) {
            setIsLoading(false)
            setError(data.error)
        }
        if (response.ok) {
    
            //SAVE USER TO LOCAL STORAGE
            localStorage.setItem('user', JSON.stringify(data))

            dispatch({type: 'LOG_IN', payload: data})
            setError(null)
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
       
}

export default useSignup
   