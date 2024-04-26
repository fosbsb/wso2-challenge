import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

function ListItem({ payment, index }) {
    const secondaryClass = index % 2 === 1 ? "list-group-item-primary" : "";
    const amount = parseFloat(payment.amount).toFixed(2);
    
    return (
        <div className={`list-group-item list-group-item-action ${secondaryClass}`} key={index}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1"><FontAwesomeIcon icon={faCreditCard} /> {payment.paymentType === 'CREDIT_CARD' ? 'CREDIT CARD' : payment.paymentType}</h5>
                <p className="mb-1">Status: {payment.status}</p>
                <p className="mb-1">Amount: {amount}</p>
                <small className="text-body-secondary">Provider: Flaviano</small>
                <small className="text-body-secondary">3 days ago</small>
            </div>
        </div>
    );
}

function ListPaymentsByCitizen({ dataPayment }) {
    return (
        <div>
            <p className="fs-4">Lista de Pagamentos Recebidos</p>
            <div className="list-group">
                {dataPayment.map((payment, index) =>
                    <ListItem payment={payment} index={index} key={index} />
                )}
            </div>
        </div>
    );
}

export default ListPaymentsByCitizen;