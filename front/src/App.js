import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './css/main.css';
import UseAuthRedirect from "./utils/UseAuthRedirect";
import SpinnerScreenLoad from './components/spinners/SpinnerScreenLoad';
import GetDataCitizenByEmail from './api/citizen/apiGetCitizenByEmail';
import { toast } from 'react-toastify';
import CustomToastContainer from './components/toasts/CustomToastContainer';
import { ToastOptions } from './utils/ToastConfig';

function App() {
  const navigate = useNavigate();

  const { state, getBasicUserInfo, signOut } = useAuthContext();

  const toastError = () => {
    toast.error('Erro ao buscar informações do usuário', ToastOptions);

    setTimeout(() => {
      signOut();
    }, 1000);
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      (async () => {
        try {
          const basicUserInfo = await getBasicUserInfo();

          try {
            const response = await GetDataCitizenByEmail(basicUserInfo.email);
            if (response.requestStatus === 200) {

              const dataUserRegister = response.data[0];

              const dataUserAuthLogged = {
                name: basicUserInfo.name,
                givenName: basicUserInfo.givenName,
                email: basicUserInfo.email,
                picture: basicUserInfo.picture
              };

              localStorage.setItem('dataUserLogged', JSON.stringify(dataUserAuthLogged));

              if (dataUserRegister) {
                navigate(`/profile/${dataUserRegister.id}`);
              } else {
                navigate('/register')
              }
            } else {
              toastError();
            }
          } catch (error) {
            toastError();
          }
        } catch (error) {
          toastError();
        }
      })();

    }
  }, [state.isAuthenticated, navigate, getBasicUserInfo]);

  return (
    <div>
      {UseAuthRedirect()}
      <CustomToastContainer />
      <SpinnerScreenLoad />
    </div>
  );
}

export default App;
