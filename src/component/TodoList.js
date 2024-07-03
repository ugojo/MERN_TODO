import { useState } from "react"
import { Link } from "react-router-dom";
import  useAuthContext  from "../hook/useAuthContext"
import  useTodoContext  from "../hook/useTodoContext"


const TodoList = ({todo})=> {

    const{user} = useAuthContext()
    const{todos,dispatch} = useTodoContext()
    
    const[error, setError] = useState(null)
    const[complete, setComplete] = useState(false)

    const handleDelete = async ()=>{

       const response = await fetch('http://localhost:4000/api/todo/'+ todo._id,{
         method: 'DELETE',
         headers: {'Content-Type': 'Application/json',
                   'Authorization': `Bearer ${user.token}`
         }
       })

       const data = await response.json()

       if (!response) {
         setError(response.error)
       }
       if (response) {
          setError(null)
          dispatch({type:'DELETE_TODO', payload: data})
          console.log("Todo has been deleted from list", data);
       }
    }

    const handleCheck = async (todoId)=>{

       setComplete(()=>!complete)

       const todo = {complete}

       const response = await fetch(`http://localhost:4000/api/todo/${todoId}`, {
          method: "PATCH",
          body: JSON.stringify(todo),
          headers: {
            'Content-Type': 'Application/json',
             'Authorization': `Bearer ${user.token}`
          }
       })
      
       const data = await response.json()

       if (!response.ok) {
         setError(response.error)
       }
       if (response.ok) {
          setError(null)
          dispatch({type:'CHECK_TODO', payload: data})
          console.log("Todo Updated", data);
          console.log("Todo Context", todos);
          console.log("Todo Complete", complete);
       }
    }

    return (
        <>
        <li className={todo.complete ? "checked" : ""}><Link className="none" to={`/tododetails/${todo._id}`}><span className="list-txt">{todo.title}</span></Link>
              <div  className="left">
             {todo.complete ? <svg className="checkedSvg" onClick={()=>handleCheck(todo._id)} width="64px" height="64px" viewBox="-20 -20 60.00 60.00" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.12"></g><g id="SVGRepo_iconCarrier"> <path fill="#68f25f" fill-rule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
             : <svg onClick={()=>handleCheck(todo._id)} width="64px" height="64px" viewBox="-20 -20 60.00 60.00" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.12"></g><g id="SVGRepo_iconCarrier"> <path fill="#ebebeb" fill-rule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
             }
             <svg onClick={handleDelete} className="delete" width="64px" height="64px" viewBox="-24 -24 72.00 72.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e42121" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.9120000000000001"> <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M20.5 6H3.49988" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M9.5 11L10 16" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M14.5 11L14 16" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M20.5 6H3.49988" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M9.5 11L10 16" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> <path d="M14.5 11L14 16" stroke="#c92637" stroke-width="0.8160000000000001" stroke-linecap="round"></path> </g></svg>
           </div>
        </li>
        </>
    )
}

export default TodoList;