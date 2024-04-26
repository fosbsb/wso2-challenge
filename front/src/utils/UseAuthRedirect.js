import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

const UseAuthRedirect = () => {
    const { state, signIn } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.isLoading && !state.isAuthenticated) {
            signIn();
        }
    }, [state.isAuthenticated, state.isLoading, signIn, navigate]);
};

export default UseAuthRedirect;