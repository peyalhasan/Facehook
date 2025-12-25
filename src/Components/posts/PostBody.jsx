import React from 'react';

const PostBody = ({post}) => {


    return (
        <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
            {/* If Post has Image, Render this block */}
            <p className="mb-4">{post?.content ?? "No Content Available"}</p>
            <div className="flex items-center justify-center overflow-hidden">
                <img className="w-1/2 " src={`${import.meta.env.VITE_SERVER_BASE_URL}/${post?.image}`} alt="poster" />
            </div>
            <p>
               {post.content}
            </p>
        </div>

    );
};

export default PostBody;