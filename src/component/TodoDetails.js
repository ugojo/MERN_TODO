import { useState } from "react"
import { useTodoContext } from "../hook/useTodoContext"
import useFetch from "../hook/useFetch"
import { useParams } from "react-router-dom"

const TodoDetails = ()=>{

   const param = useParams()

    const {todo, isLoading, error} = useFetch(`https://todo-9bl4.onrender.com/api/todo/${param.id}`)

    

    return(
        <>
         { isLoading ? <h4>Loading....</h4> : todo &&
          <div className="todo-container" >
                <label ><h3>Todo Details</h3></label>
                <input 
                type="text"
               //  onChange={(e)=>setTitle(e.target.value)}
                value={todo.title}
                className="todoDetail"
                />
                <label >Category</label>
                <input 
                type="text"
               //  onChange={(e)=>setCategoty(e.target.value)}
                value={todo.category}
                className="todoDetail"
                />
                <label> Priority</label>
                <select value={todo.priority} 
               //   onChange={(e)=> setPriority(e.target.value)} 
                 name="priority"
                 className="todoDetail"
                 disabled>
                   <option> Low </option>
                   <option> High </option>
                </select>
                <label >Description</label>
                <textarea 
                type="text"
               //  onChange={(e)=>setDescription(e.target.value)}
                value={todo.description}
                className="todoDetail"
                />
               <h4>{todo.complete? "COMPLETED": "PENDING..."}</h4>
           
             {error && error}
          </div>
         }
        </>
    )
}

export default TodoDetails