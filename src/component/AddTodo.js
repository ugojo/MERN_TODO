import { useState } from "react";
import  useAuthContext  from "../hook/useAuthContext";
import  useTodoContext  from "../hook/useTodoContext";


const AddTodo = ({cate})=>{
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    const {user} = useAuthContext()
    const {dispatch} = useTodoContext()


    const handleSubmit = async (e)=>{
       e.preventDefault()

       const todo = {title, category, priority, description}

       const response = await fetch('/api/todo/', {
          method: "POST",
          body: JSON.stringify(todo),
          headers: {
            'Content-Type': 'Application/json',
             'Authorization': `Bearer ${user.token}`
          }
       })

       const data = await response.json()

       if (!response.ok) {
           setError(data.error)
       }
       if (response.ok) {
           setError(null)
           dispatch({type:'CREATE_TODO', payload: data})
           console.log("New Todo added to the list", data);
           setTitle("")
           setCategory("")
           setPriority("")
           setDescription("")

       }
    }

    return(
        <>
          <div className="todo-container">
             <form onSubmit={handleSubmit}>
                <label >Todo Title</label>
                <input 
                type="text"
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                required
                />
                <label >Category</label>
                <input 
                type="text"
                onChange={(e)=>setCategory(e.target.value)}
                value={category}
                required
                />
                <label >Priority</label>
                <select value={priority} onChange={(e)=> setPriority(e.target.value)} name="priority" required>
                   <option> </option>
                   <option> Low </option>
                   <option> High </option>
                </select>
                <label >Description</label>
                <textarea 
                type="text"
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                required
                />
                <input  type="submit"/>
             </form>
             {error && error}
          </div>
        </>
    )
}

export default AddTodo;