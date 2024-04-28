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
import ListCitizenForPayment from "../components/ListCitizenForPayment";
import GetDataCitizenByProfileActive from "../api/citizen/apiGetCitizenByProfileActive";

function Payment() {
    const { state, signOut } = useAuthContext();
    const { userId } = useParams();
    const navigate = useNavigate();

    const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'));

    let [dataCitizen, setDataCitizen] = useState(null);
    let [dataCitizens, setDataCitizens] = useState(null);

    const [loadingPage, setLoadingPage] = useState(true);

    const toastError = () => {
        navigate('/');

        setTimeout(() => {
            toast.error('Erro ao obter informações do usuário', ToastOptions);
        }, 1000);
    };

    const toastErrorCitizens = () => {
        toast.error('Erro ao obter informações de citizens', ToastOptions);
    };

    useEffect(() => {
        (async () => {
            if (!state.isLoading) {
                try {
                    const response = await GetDataCitizenById(userId);
                    if (response.requestStatus === 200) {

                        if ((response.data.email !== dataUserLogged.email) || (response.data.profile !== 'PROVIDER') || (response.data.profile == 'ADMIN') || !(response.data.active)) {
                            navigate('/');
                        }

                        try{
                            const responseCitizens = await GetDataCitizenByProfileActive('CITIZEN');

                            if (response.requestStatus === 200) {
                                setDataCitizens(responseCitizens.data);
                            }else{
                                toastErrorCitizens();
                            }
                        }catch (error){
                            toastErrorCitizens();
                        }

                        setDataCitizen(response.data);
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
    }, [state, setDataCitizen, setDataCitizens]);

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
                        <p className="fs-3">List of Citizens</p>
                        <ListCitizenForPayment dataCitizens={dataCitizens} idProvider={userId} />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Payment;