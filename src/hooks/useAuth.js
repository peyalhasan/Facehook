
import { useContext, useDebugValue } from "react";
import { AuthContext } from "../Context";

export const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? 'User LogedIn' : 'User Loged Out')
    return useContext(AuthContext)
}

