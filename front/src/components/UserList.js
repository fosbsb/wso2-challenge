import React from 'react';
import imagem from '../images/cabeca-de-desenho-animado-isolada_1308-150493.avif';

const UserCard = ({ name, email, phone, document, profile, imagem }) => {
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
                        <a href="#" className="btn btn-primary">Ver Documento</a>
                    </div>
                </div>
                <div className="col-md-4">
                    <img src={imagem} alt={name} className="user-photo card-img-bottom" />
                </div>
                <div className="col-md-12">
                    <div className="position-relative">

                        <div>
                            <div className="d-flex justify-content-end mt-2">
                                <a href="#" className="btn btn-outline-success me-2">Aprovar</a>
                                <a href="#" className="btn btn-outline-danger">Reprovar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const UserList = ({userLogged}) => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Administração de Usuários - {userLogged}</h1>
            <div className="row" id="userList">
                <div className="col">
                    <UserCard name="João" email="joao@example.com" phone="123456789" document="123456789" profile="Padrão" imagem={imagem} />
                </div>
                <div className="col">
                    <UserCard name="Maria" email="maria@example.com" phone="987654321" document="987654321" profile="Avançado" imagem={imagem} />
                </div>
                <div className="col">
                    <UserCard name="Maria" email="maria@example.com" phone="987654321" document="987654321" profile="Avançado" imagem={imagem} />
                </div>
                <div className="col">
                    <UserCard name="Maria" email="maria@example.com" phone="987654321" document="987654321" profile="Avançado" imagem={imagem} />
                </div>
            </div>
        </div>
    );
}

export default UserList;
