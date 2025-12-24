import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxiosAuthentication';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        setLoading(true)
        const fetchProfile = async() =>{
            try{
              const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
              setUser(response?.data?.user)
              setPosts(response?.data?.posts)
            }catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        
        fetchProfile()
    }, [])

    return (
        <div>
           {user?.firstName}
        </div>
    );
};

export default ProfilePage;