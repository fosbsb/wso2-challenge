import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import Footer from "../components/Footer";

function Dashboard() {
    const { state, signOut, getBasicUserInfo, getDecodedIDToken, getIDToken } = useAuthContext();
    let [derivedAuthenticationState, setDerivedAuthenticationState] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {

        if (!state.isAuthenticated) {
            return navigate("/");
        }

        (async () => {
            const basicUserInfo = await getBasicUserInfo();
            const idToken = await getIDToken();
            const decodedIDToken = await getDecodedIDToken();

            const derivedState = {
                authenticateResponse: basicUserInfo,
                idToken: idToken.split("."),
                decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
                decodedIDTokenPayload: decodedIDToken
            };

            setDerivedAuthenticationState(derivedState);
        })();
    }, [state.isAuthenticated, getBasicUserInfo, getIDToken, getDecodedIDToken, navigate]);

    return (
        <div>
            <Navbar isAuthenticated={state.isAuthenticated} signOut={signOut} />
            <div className="container">
                <UserList userLogged={derivedAuthenticationState ? derivedAuthenticationState.authenticateResponse.name : state.displayName}/>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;