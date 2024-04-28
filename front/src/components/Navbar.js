import React from 'react';

const Navbar = ({ isAuthenticated, signIn = () => { }, signOut = () => { }, menuActive, dataCitizen }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Immigrant-APP</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {dataCitizen.profile === 'PROVIDER' ? (
                                 <a className="nav-link" aria-current="page" href={`/payment/${dataCitizen.id}`}>Make Payment</a>
                            ) : (
                                <a className="nav-link active" aria-current="page" href="#">{menuActive}</a>
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