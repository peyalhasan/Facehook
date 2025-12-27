import React, { useState } from 'react';
import { getDateDifferenceFromNow } from '../../utils';
import TimeIcon from '../../assets/icons/time.svg'
import ThreeDotsIcon from '../../assets/icons/3dots.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import { useAvatar } from '../../hooks/useAvatar';
import { usePost } from '../../hooks/usePost';
import { useAuth } from '../../hooks/useAuth';
import { actions } from '../../actions';
import useAxios from '../../hooks/useAxiosAuthentication';

const PostHeader = ({ post }) => {
    const [showAction, setShowAction] = useState(false)
    const { setPostToEdit, setShowPostEntry } = usePost()
    const { auth } = useAuth()
    const time = getDateDifferenceFromNow(post.createAt)
    const { avatarURL, author } = useAvatar(post)
    const { dispatch } = usePost()
    const isMe = auth?.user?.id === post?.author?.id
    const {api} = useAxios()

    const editPost = (post) => {
        setPostToEdit(post);
        setShowPostEntry(true)
        setShowAction(false)
    }

    const handleDeletePost = async (post) => {
        dispatch({ type: actions.post.DATA_FETCHING })
        try {
            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.post.POST_DELETED,
                    data: post.id,
                });
            }
        } catch (error) {
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    }

    return (
        <header className="flex items-center justify-between gap-4">
            {/* author info */}
            <div className="flex items-center gap-3">
                <img
                    className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                    src={avatarURL}
                    alt={author}
                />
                <div>
                    <h6 className="text-lg lg:text-xl">{author}</h6>
                    <div className="flex items-center gap-1.5">
                        <img src={TimeIcon} alt="time" />
                        <span className="text-sm text-gray-400 lg:text-base">{time}</span>
                    </div>
                </div>
            </div>
            {/* author info ends */}
            {/* action dot */}
            {
                isMe &&
                <div className="relative">
                    <button onClick={() => setShowAction(true)}>
                        <img src={ThreeDotsIcon} alt="3dots of Action" />
                    </button>
                    {/* Action Menus Popup */}
                    {
                        showAction && (
                            <div className="action-modal-container">
                                <button
                                    onClick={() => editPost(post)}
                                    className="action-menu-item hover:text-lwsGreen">
                                    <img src={EditIcon} alt="Edit" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePost(post)}
                                    className="action-menu-item hover:text-red-500">
                                    <img src={DeleteIcon} alt="Delete" />
                                    Delete
                                </button>
                            </div>
                        )
                    }
                </div>
            }
            {/* action dot ends */}
        </header>

    );
};

export default PostHeader;