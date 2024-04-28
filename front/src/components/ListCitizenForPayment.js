import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ModalPaymentForCitizen from './ModalPaymentForCitizen';

function ListCitizenForPayment({ dataCitizens, idProvider }) {
    const [nameCitizen, setNameCitizen] = useState(null);
    const [idCitizen, setIdCitizen] = useState(null);

    const handleClick = (nameCitizen, idCitizen) => {
        setNameCitizen(nameCitizen);
        setIdCitizen(idCitizen);
    }

    return (
        <div>
            <ModalPaymentForCitizen nameCitizen={nameCitizen} idProvider={idProvider} idCitizen={idCitizen} />
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
                {!dataCitizens || dataCitizens.length === 0 ? (
                    <div className="alert alert-warning" role="alert" style={{width: '100%'}}>
                        No citizens found or not active
                    </div>
                ) : (
                    dataCitizens.map((citizen, index) =>
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{citizen.name}</h5>
                                    <p className="card-text">Email: {citizen.email}</p>
                                    <p className="card-text">Phone: {citizen.phone}</p>
                                    <p className="card-text">Status: {citizen.active ? 'Ativo' : 'Não ativo'}</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-body-secondary">Created {formatDistanceToNow(new Date(citizen.dateCreated), { addSuffix: true })}</small>
                                </div>
                                <div className="card-footer">
                                    <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#paymentForCitizen" onClick={() => handleClick(citizen.name, citizen.id)}>Payment</button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default ListCitizenForPayment;