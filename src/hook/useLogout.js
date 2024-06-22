import useAuthContext from "./useAuthContext"
import useTodoContext from "./useAuthContext"

const useLogout = ()=>{
    
   const {dispatch} = useAuthContext()
   const {dispatch: todoDispatch} = useTodoContext()
   
    const logout = async()=>{
        // REMOVE USER DETAIL FROM LOCAL STORAGE
        localStorage.removeItem('user')

        dispatch({type: 'LOG_OUT'})
        todoDispatch({type: 'SET_TODO', payload: null})
    }

    return {logout}
}

export default useLogout;