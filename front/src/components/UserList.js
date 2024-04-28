import React, { useState } from 'react';
import UpdateStatusCitizen from '../api/citizen/apiUpdateStatusCitizen';
import SpinnerSizeSm from './spinners/SpinnerSizeSm';
import { toast } from 'react-toastify';
import { ToastOptions } from "../utils/ToastConfig";

const UserCard = ({ id, name, email, phone, document, profile, imagem, status }) => {
    const [isActive, setIsActive] = useState(status);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const toastErrorStatus = () => {
        toast.error('Error for updated citizen', ToastOptions);
    }

    const toggleStatus = async () => {
        // setIsActive(!isActive);
        try {
            setLoadingStatus(true);

            const response = await UpdateStatusCitizen(id, !isActive);
            if (response.requestStatus === 200) {
                toast.success('citizen successfully updated', ToastOptions);

                setIsActive(!isActive)
            } else {
                toastErrorStatus();
            }
        } catch (error) {
            toastErrorStatus();
        } finally {
            setLoadingStatus(false);
        }
    };

    return (
        <div className="card user-card col position-relative">
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{name}</h3>
                        <p className="card-text"><strong>Email:</strong> {email}</p>
                        <p className="card-text"><strong>Telefone:</strong> {phone}</p>
                        <p className="card-text"><strong>Documento:</strong> {document}</p>
                        <p className="card-text"><strong>Perfil:</strong> {profile}</p>
                        <p className="card-text"><strong>Status:</strong> {isActive ? 'Ativo' : 'Desativo'}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <img src={imagem} alt={name} className="user-photo card-img-bottom" />
                </div>
                <div className="col-md-12">
                    <div className="position-relative">

                        <div>
                            <div className="d-flex justify-content-end mt-2">
                                {isActive ? (
                                    <button onClick={toggleStatus} className="btn btn-outline-danger">
                                        {loadingStatus ? (
                                            <SpinnerSizeSm />
                                        ) : (
                                            'Desativar'
                                        )
                                        }
                                    </button>
                                ) : (
                                    <button onClick={toggleStatus} className="btn btn-outline-success">
                                        {loadingStatus ? (
                                            <SpinnerSizeSm />
                                        ) : (
                                            'Ativar'
                                        )
                                        }
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const UserList = ({ userLogged, pictureUserLogged, dataCitizens }) => {
    return (
        <div className="container">
            <p className="fs-3">Citizens Administration - {userLogged}</p>
            <div className="row mt-3" id="userList">
                {!dataCitizens || dataCitizens.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                        No citizens found
                    </div>
                ) : (
                    dataCitizens.map((citizen, index) =>
                        <div className="col" key={index}>
                            <UserCard id={citizen.id} name={citizen.name} email={citizen.email} phone={citizen.phone} document={citizen.documentNumber} profile={citizen.profile} status={citizen.active} imagem={pictureUserLogged} />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default UserList;
