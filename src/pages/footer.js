import { Link } from "react-router-dom";
import useAuthContext from '../hook/useAuthContext'
import useLogout from "../hook/useLogout";

const Footer = ()=>{
     const {user} = useAuthContext()
     const {logout} = useLogout()

     const handleSubmit  = ()=>{
       logout()

     }
    return (
        <>
         <div className="footer">
            <ul className="fUl">
                <li className="active">  
                  <Link className="link" to={'/'} > Home</Link>
                </li>
                <li> 
                  <Link className="link" to={'/about'} > About</Link>
                </li>
                {!user && 
                  <div>
                    <li> 
                    <Link className="link" to={'/login'} > Login</Link>
                   </li>
                   <li> 
                    <Link className="link" to={'/signup'} > Signup</Link>
                   </li>
                  </div>
                }
                {user && 
                   <li>
                      <Link onClick={handleSubmit} className="link" > Logout </Link>
                   </li>
                }   
            </ul>
        </div>
        </>
    )
}

export default Footer;