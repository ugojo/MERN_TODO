import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";


export const useTodoContext = ()=>{

    const context = useContext(TodoContext)

    if (!context) {
        throw Error("TodoContext must be use in context")
    }

    return context
}


export default useTodoContext;