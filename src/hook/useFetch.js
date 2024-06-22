
import { useState, useEffect } from 'react'
import useAuthContext  from '../hook/useAuthContext'
import useTodoContext from './useTodoContext'


const useFetch =  (url)=>{

    const [todo, setTodo] = useState(null)
    const [isLoading, setIsLoading] =useState(false)
    const [error, setError] =useState(null)

    const {user} = useAuthContext()
   

    useEffect(() => {
       const fetchData = async()=>{
        setIsLoading(true)
       
            const response = await fetch(url,{
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
               })
            const data = await response.json()
            console.log(data);

            if (!response.ok) {
                setError(data.message)  
                setIsLoading(false)    
            }
            if (response.ok) {
                setTodo(data)   
                setIsLoading(false)
            }
            
       }
       fetchData()
    }, [url])
    

   
   return {todo, isLoading, error}    

}

export default useFetch