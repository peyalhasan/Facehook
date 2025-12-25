import { useContext } from "react";
import { ProfileContext } from "../Context";


const useProfile = () =>{
    return useContext(ProfileContext)
}

export {useProfile}