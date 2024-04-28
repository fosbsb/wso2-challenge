import React from 'react';
import imagem from '../images/img-02.jpeg';

const Navbar = ({ isAuthenticated, signIn = () => { }, signOut = () => { }, dataCitizen }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={imagem} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" style={{ marginRight: '10px' }} />
                    <span style={{ marginLeft: '10px' }}>Immigrant-APP</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {dataCitizen && dataCitizen.profile === 'PROVIDER' && dataCitizen.active && (
                                <a className="nav-link" aria-current="page" href={`/payment/${dataCitizen.id}`}>Make Payment</a>
                            )}
                        </li>
                    </ul>
                    {!isAuthenticated ? (
                        <button className="login-button" onClick={() => signIn()}>
                            Login
                        </button>
                    ) : (
                        <button className="logout-button" onClick={() => signOut()}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;