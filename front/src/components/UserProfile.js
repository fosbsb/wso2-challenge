import React from 'react';
import { format } from 'date-fns';
import image from '../images/profile.png'

const UserProfile = ({ userPicture, dataCitizen }) => {
    const dataFormatada = dataCitizen.dateCreated ? format(new Date(dataCitizen.dateCreated), 'dd/MM/yyyy HH:mm') : '';

    return (
        <div className='mt-3'>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={userPicture ? userPicture : image} referrerPolicy="no-referrer" className="img-fluid rounded" alt="..." style={{maxHeight: '150px', width: '150px'}} />
                    </div>
                    <div className="col-md-4">
                        <div className="card-body" style={{ textAlign: 'left' }}>
                            <h5 className="card-title">Dados de Cadastro</h5>
                            <p className="card-text"><strong>Status:</strong> {dataCitizen.active ? 'Ativo' : 'Não ativo'}</p>
                            <p className="card-text"><strong>Perfil:</strong> {dataCitizen.profile}</p>
                            <p className="card-text"><strong>Nome:</strong> {dataCitizen.name}</p>
                            <p className="card-text"><strong>Email:</strong> {dataCitizen.email}</p>
                            <p className="card-text"><strong>Telefone:</strong> {dataCitizen.phone}</p>
                            <p className="card-text"><strong>Documento:</strong> {dataCitizen.documentNumber}</p>
                            <p className="card-text"><strong>CEP:</strong> {dataCitizen.cep}</p>
                            <p className="card-text"><strong>Endereço:</strong> {dataCitizen.address}</p>
                            <p className="card-text"><small className="text-body-secondary">Criado em: {dataFormatada}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;