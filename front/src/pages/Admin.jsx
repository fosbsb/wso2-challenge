import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import Footer from "../components/Footer";
import { toast } from 'react-toastify';
import { ToastOptions } from "../utils/ToastConfig";
import CustomToastContainer from "../components/toasts/CustomToastContainer";
import UseAuthRedirect from "../utils/UseAuthRedirect";
import SpinnerScreenLoad from "../components/spinners/SpinnerScreenLoad";
import GetDataCitizenByEmail from "../api/citizen/apiGetCitizenByEmail";
import GetDataCitizen from "../api/citizen/apiGetCitizen";

function Admin() {
    const navigate = useNavigate();
    const { state, signOut } = useAuthContext();
    const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'));
    const [loadingPage, setLoadingPage] = useState(true);
    let [dataCitizens, setDataCitizens] = useState(null);

    const toastError = () => {
        navigate('/');

        setTimeout(() => {
            toast.error('Erro ao obter informações do usuário', ToastOptions);
        }, 1000);
    };

    const toastErrorCitizens = () => {
        navigate('/');

        setTimeout(() => {
            toast.error('Erro ao obter informações dos citizens', ToastOptions);
        }, 1000);
    };

    useEffect(() => {
        (async () => {
            if (!state.isLoading) {
                try {
                    const response = await GetDataCitizenByEmail(dataUserLogged.email, true);

                    const dataCitizenRegister = response.data[0];

                    if (response.requestStatus === 200) {
                        if ((dataCitizenRegister.email !== dataUserLogged.email) || (dataCitizenRegister.profile !== 'ADMIN')) {
                            navigate('/');
                        }

                        try {
                            const responsePayment = await GetDataCitizen();

                            if (response.requestStatus === 200) {
                                setDataCitizens(responsePayment.data);
                            } else {
                                toastErrorCitizens();
                            }
                        } catch (error) {
                            toastErrorCitizens();
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
                    <div className="container mt-3">
                        <UserList userLogged={dataUserLogged ? dataUserLogged.givenName : ''} pictureUserLogged={dataUserLogged ? dataUserLogged.picture : ''} dataCitizens={dataCitizens} />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Admin;