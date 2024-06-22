import { createContext, useReducer } from "react";


const INITIAL_STATE = {
    todos: null,
    isLoading : false,
    error : null
}
export const TodoContext = createContext()

export const todoReducer = (state, action)=>{
 switch (action.type) {
    case 'GET_TODOS':
        return {
            isLoading: true,
            todos: null,
            error: null
        }
    case 'SET_TODOS':
        return {
            todos: action.payload,
            isLoading: false,
            error: null
        }
    case 'CREATE_TODO':
        return {
            todos: [action.payload, ...state.todos]
        }
    case 'CHECK_TODO':
        return {
            todos: state.todos.map(todo=> 
                todo._id === action.payload._id ? {...todo, complete: !todo.complete } : todo)
        }
    case 'DELETE_TODO':
        return {
            todos: state.todos.filter((todo)=> todo._id !== action.payload._id)
        }
 
    default:
        return state
 }
}

export const TodoContextProvider = ({ children })=>{

    const [state, dispatch] = useReducer(todoReducer, {
        // todos: null
        INITIAL_STATE
    })
    
        return (
            <TodoContext.Provider value={{...state, dispatch}}>
                {children }
            </TodoContext.Provider>
        )
    }