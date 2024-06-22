import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    if (!context) {
        throw Error("AuthContext must be use in context")
    }

    return context
}

export default useAuthContext;