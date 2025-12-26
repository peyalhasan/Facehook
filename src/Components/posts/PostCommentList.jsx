import React, { useState } from 'react';

const PostCommentList = ({ comments }) => {

    const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'relevant'

    const getSortedComments = () => {
        if (!comments) return [];

        const clonedComments = [...comments];

        if (sortBy === 'recent') {
            return clonedComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        if (sortBy === 'relevant') {

            return clonedComments.sort((a, b) => b.comment.length - a.comment.length);
        }

        return clonedComments;
    };

    const sortedComments = getSortedComments();
    return (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
            {/* Sorting controls  */}
            <div className="flex justify-end items-center mb-6">

                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-xs text-gray-400">Sort by:</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-lighterDark text-xs font-medium px-2 py-1 rounded border border-gray-600 text-white focus:outline-none focus:border-primary cursor-pointer"
                    >
                        <option value="recent" className="text-black bg-white">
                            Recent
                        </option>
                        <option value="relevant" className="text-black bg-white">
                            Most Relevant
                        </option>
                    </select>
                </div>
            </div>
            {/* single comment */}

            {
                sortedComments && sortedComments.length > 0 ? (
                    sortedComments.map((comment, index) => (
                        <div key={index} className="flex items-center gap-3 pt-4">
                            <img
                                className="max-w-6 max-h-6 rounded-full"
                                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${comment.author.avatar}`}
                                alt="avatar"
                            />
                            <div>
                                <div className="flex gap-1 text-xs lg:text-sm">
                                    <span>{comment?.author?.name}: </span>
                                    <span>{comment?.comment}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center text-sm pt-4">No Comments there!</p>
                )
            }
        </div>
    );
};

export default PostCommentList;