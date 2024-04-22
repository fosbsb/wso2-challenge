import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../css/main.css';
import Navbar from "../components/Navbar";
import ListaUsuarios from "../components/ListaUsuarios";
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

    // Exibe informações simples do usuário como nome e email definidos no Identity Server
    // Caso queira ver outras informações como Header, payload entre outros, use console.log(derivedAuthenticationState.chave) para visualizar
    return (
        <div>
            <Navbar isAuthenticated={state.isAuthenticated} signOut={signOut} />
            <div className="container">
                <ListaUsuarios userLogged={state.username}/>
                {/* <h1 className="title"> Infos: </h1>
                <div className="info-box">
                    <h2> Bem-vindo, {state.username} </h2>
                    <h3> Seu email é: {state.email}</h3>
                    <a href="https://localhost:9443/myaccount" target="_blank"><p>WSO2 MyAccount</p></a>
                    <p> Outras informações sobre como utilizar a ferramenta você encontra em: <a href="https://is.docs.wso2.com/en/6.1.0/" target="_blank"> WSO2 Identity Server Documentation </a></p>
                </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;