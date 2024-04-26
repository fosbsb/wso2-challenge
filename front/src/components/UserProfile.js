import React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ userPicture, dataUser }) => {
    const dataFormatada = dataUser.dateCreated ? format(new Date(dataUser.dateCreated), 'dd/MM/yyyy HH:mm') : '';

    return (
        <div>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={userPicture} referrerPolicy="no-referrer" className="img-fluid rounded" alt="..." style={{maxHeight: '150px', width: '150px'}} />
                    </div>
                    <div className="col-md-4">
                        <div className="card-body" style={{ textAlign: 'left' }}>
                            <h5 className="card-title">Dados de Cadastro</h5>
                            <p className="card-text"><strong>Status:</strong> {dataUser.active ? 'Ativo' : 'Não ativo'}</p>
                            <p className="card-text"><strong>Perfil:</strong> {dataUser.profile}</p>
                            <p className="card-text"><strong>Nome:</strong> {dataUser.name}</p>
                            <p className="card-text"><strong>Email:</strong> {dataUser.email}</p>
                            <p className="card-text"><strong>Telefone:</strong> {dataUser.phone}</p>
                            <p className="card-text"><strong>Documento:</strong> {dataUser.documentNumber}</p>
                            <p className="card-text"><strong>CEP:</strong> {dataUser.cep}</p>
                            <p className="card-text"><strong>Endereço:</strong> {dataUser.address}</p>
                            <p className="card-text"><small className="text-body-secondary">Criado em: {dataFormatada}</small></p>
                        </div>
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', padding: '20px' }}>
                        <button type="button" className="btn btn-primary"><FontAwesomeIcon icon={faUserPen} /> Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;