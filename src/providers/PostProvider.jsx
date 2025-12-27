import { useReducer, useState } from "react";
import { PostContext } from "../Context";
import { postReducer, initialState } from '../reducers/PostReducter'

const PostProvider = ({ children }) => {
    const [postToEdit, setPostToEdit] = useState(null);
    const [showPostEntry, setShowPostEntry] = useState(false);
    const [state, dispatch] = useReducer(postReducer, initialState)
    return (
        <PostContext.Provider value={{ state, dispatch , showPostEntry, setShowPostEntry, postToEdit, setPostToEdit}} >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;