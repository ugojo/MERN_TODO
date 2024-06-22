import { useState } from "react"
import useLogin from "../hook/useLogin"
import { Link } from "react-router-dom"


const Login =()=>{
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        await login(email, password)
        
    }

    return(
        <>
            <div className="todo-container">
              <h2>Login </h2>
             <form onSubmit={handleSubmit}>
            
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
             <h3>  OR<Link to={'/signup'} > Signup </Link></h3> 
             {error && <div className="error"> {error}</div>}
          </div>
        </>
    )
}

export default Login