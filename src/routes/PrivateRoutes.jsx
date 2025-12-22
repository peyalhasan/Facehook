
import Header from '../Components/common/Header';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

const PrivateRoutes = () => {
    const { auth } = useAuth();



    return (
        <>
            {
                auth.user ? (
                    <>
                        <Header />
                        <main
                            className="flex min-h-screen  justify-center bg-deepDark "
                        >
                            <div className='container mx-auto'>
                                <Outlet />
                            </div>
                        </main>
                    </>
                ) : (
                    <Navigate to='/login' />
                )
            }
        </>
    );
};

export default PrivateRoutes;