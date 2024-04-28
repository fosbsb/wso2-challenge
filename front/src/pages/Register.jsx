import { useAuthContext } from "@asgardeo/auth-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";
import UseAuthRedirect from "../utils/UseAuthRedirect";
import SpinnerScreenLoad from "../components/spinners/SpinnerScreenLoad";
import GetDataCitizenByEmail from "../api/citizen/apiGetCitizenByEmail";
import { toast } from 'react-toastify';
import { ToastOptions } from "../utils/ToastConfig";
import CustomToastContainer from "../components/toasts/CustomToastContainer";

function Register() {
    const navigate = useNavigate();
    const { state, signOut } = useAuthContext();
    const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'));
    const [loadingPage, setLoadingPage] = useState(true);

    const toastError = () => {
        navigate('/');

        setTimeout(() => {
            toast.error('Erro ao obter informações do usuário', ToastOptions);
        }, 1000);
    };

    useEffect(() => {
        (async () => {
            if (!state.isLoading) {
                try {
                    const response = await GetDataCitizenByEmail(dataUserLogged.email);
                    if (response.requestStatus === 200) {
                        if (response.data && response.data.length !== 0) {
                            if ((response.data.email !== dataUserLogged.email) || (response.data.profile == 'ADMIN')) {
                                navigate('/');
                            }
                        }
                    } else {
                        toastError();
                    }

                } catch (error) {
                    toastError();
                } finally {
                    setLoadingPage(false);
                }
            }
        })();
    }, [state]);

    return (
        <div>
            {UseAuthRedirect()}
            <CustomToastContainer />
            {state.isLoading && !state.isAuthenticated || loadingPage ? (
                <SpinnerScreenLoad />
            ) : (
                <div>
                    <Navbar isAuthenticated={state.isAuthenticated} signOut={signOut} />
                    <div className="container">
                        <RegistrationForm nome={dataUserLogged ? dataUserLogged.name : ''} email={dataUserLogged ? dataUserLogged.email : ''} />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Register;