import React from 'react';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
    const { auth } = useAuth()
    return (
        <>
            <div >
                <h1>Home</h1>
            </div>
        </>
    );
};

export default HomePage;