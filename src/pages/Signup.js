import { useState } from "react"
import useSignup from "../hook/useSignup"


const Signup =()=>{
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        await signup(fullname, email, password)
        
    }

    return(
        <>
            <div className="todo-container">
                <h2> Signup</h2>
             <form onSubmit={handleSubmit}>
                <label> FullName</label>
                <input 
                type="text"
                onChange={(e)=>setFullname(e.target.value)}
                value={fullname}
                />
                <label >Email</label>
                <input 
                type="text"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                />
                <label >Password</label>
                <input 
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                />
                <input disabled={isLoading} type="submit"/>
             </form>
             {error && <div className="error"> {error}</div>}
          </div>
        </>
    )
}

export default Signup