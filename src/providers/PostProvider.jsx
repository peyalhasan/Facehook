import { useReducer } from "react";
import { PostContext } from "../Context";
import { postReducer, initialState } from '../reducers/PostReducter'

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState)
    return (
        <PostContext.Provider value={{ state, dispatch }} >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;