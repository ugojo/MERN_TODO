import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const AuthReducer = (state, action)=>{
    switch (action.type) {
        case 'LOG_IN':
            return {
                user: action.payload
            }
        case 'LOG_OUT':
            return {
                user: null
            }
    
        default:
           return  state;
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer,{ user : null})

    useEffect(() => {
        const user =  JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type: 'LOG_IN', payload: user})
        }
      
    }, [])
    

    return (
        <AuthContext.Provider  value={{dispatch, ...state}}>
            {children}
        </AuthContext.Provider>
    )
}