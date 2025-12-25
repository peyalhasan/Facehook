import React, { useState } from 'react';
import PostCommentList from './PostCommentList';
import { useAvatar } from '../../hooks/useAvatar';

const PostComments = ({ post }) => {

    const [showComments, setShowComments] = useState(false)

    const { avatarURL } = useAvatar(post)

    return (
        <div>
            {/* comment input box */}
            <div className="flex-center mb-3 gap-2 lg:gap-4">
                <img
                    className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                    src={avatarURL}
                    alt="avatar"
                />
                <div className="flex-1">
                    <input
                        type="text"
                        className="h-8 border border-white w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                        name="post"
                        id="post"
                        placeholder="What's on your mind?"
                    />
                </div>
            </div>
            {/* comment filter button */}
            <div className="mt-4" onClick={(e) => {
                e.preventDefault();
                setShowComments(!showComments);
            }}
            >
                <button className="text-gray-300 max-md:text-sm">All Comment ▾</button>
            </div>
            {/* comments */}

            {
                showComments && <PostCommentList post={post} />
            }

            {/* comments ends */}
        </div>

    );
};

export default PostComments;