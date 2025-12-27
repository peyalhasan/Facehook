import React from 'react';
import PostCard from './PostCard';

const PostList = ({posts}) => {
    const sortedPosts = Array.isArray(posts)? [...posts].sort((a,b)=>new Date(b.createAt) - new Date(a.createAt)): []
    return (
        !!sortedPosts && sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))
    );
};

export default PostList;