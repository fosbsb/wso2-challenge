import { useAuthContext } from "@asgardeo/auth-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UseAuthRedirect from "../utils/UseAuthRedirect";
import SpinnerScreenLoad from "../components/spinners/SpinnerScreenLoad";
import GetDataCitizenById from "../api/citizen/apiGetCitizenById";
import { toast } from 'react-toastify';
import CustomToastContainer from "../components/toasts/CustomToastContainer";
import { ToastOptions } from "../utils/ToastConfig";
import UserProfile from "../components/UserProfile";
import ListPaymentsByCitizen from "../components/ListPaymentsByCitizen";
import GetDataPaymentByCitizen from "../api/payment/apiGetPaymentByCitizen";

function Profile() {
    const { state, signOut } = useAuthContext();
    const { userId } = useParams();
    const navigate = useNavigate();
    const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'));
    let [dataCitizen, setDataCitizen] = useState(null);
    let [dataPayment, setDataPayment] = useState(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [profileCitizen, setProfileCitizen] = useState('');

    const toastError = () => {
        navigate('/');

        setTimeout(() => {
            toast.error('Erro ao obter informações do usuário', ToastOptions);
        }, 1000);
    };

    const toastErrorPayment = () => {
        toast.error('Erro ao obter informações de pagamentos', ToastOptions);
    };

    useEffect(() => {
        (async () => {
            if (!state.isLoading) {
                try {
                    const response = await GetDataCitizenById(userId);
                    if (response.requestStatus === 200) {

                        if ((response.data.email !== dataUserLogged.email) || (response.data.profile === 'ADMIN')) {
                            navigate('/');
                        }

                        try {
                            const responsePayment = await GetDataPaymentByCitizen(userId);

                            if (response.requestStatus === 200) {
                                setDataPayment(responsePayment.data);
                            } else {
                                toastErrorPayment();
                            }
                        } catch (error) {
                            toastErrorPayment();
                        }

                        setDataCitizen(response.data);
                        setProfileCitizen(response.data.profile);
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
    }, [state, setDataCitizen, setDataPayment]);

    return (
        <div>
            <CustomToastContainer />
            {UseAuthRedirect()}
            {state.isLoading && !state.isAuthenticated || loadingPage ? (
                <SpinnerScreenLoad />
            ) : (
                <div>
                    <Navbar isAuthenticated={state.isAuthenticated} signOut={signOut} dataCitizen={dataCitizen} />
                    <div className="container">
                        <p className="fs-3">Bem vindo - {dataUserLogged.givenName}</p>
                        <UserProfile userPicture={dataUserLogged ? dataUserLogged.picture : ''} dataCitizen={dataCitizen ? dataCitizen : ''} />
                        {profileCitizen === 'CITIZEN' && (
                            <ListPaymentsByCitizen dataPayment={dataPayment} />
                        )}
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Profile;