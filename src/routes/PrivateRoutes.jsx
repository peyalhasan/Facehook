
import Header from '../Components/common/Header';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import ProfileProvider from '../providers/ProfileProvider';

const PrivateRoutes = () => {
    const { auth } = useAuth();



    return (
        <>
            {
                auth.authToken ? (
                    <>
                        <ProfileProvider>
                            <Header />
                            <main
                                className="flex min-h-screen  justify-center bg-deepDark "
                            >
                                <div className='container mx-auto'>
                                    <Outlet />
                                </div>
                            </main>
                        </ProfileProvider>
                    </>
                ) : (
                    <Navigate to='/login' />
                )
            }
        </>
    );
};

export default PrivateRoutes;