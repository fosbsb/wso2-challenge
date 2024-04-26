import { useAuthContext } from "@asgardeo/auth-react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";
import UseAuthRedirect from "../utils/UseAuthRedirect";
import SpinnerScreenLoad from "../components/spinners/SpinnerScreenLoad";

function Register() {
    const { state, signOut } = useAuthContext();
    const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'));

    return (
        <div>
            {UseAuthRedirect()}
            {state.isLoading && !state.isAuthenticated ? (
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