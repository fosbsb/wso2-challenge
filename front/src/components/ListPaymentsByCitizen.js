import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import GetDataCitizenById from '../api/citizen/apiGetCitizenById';
import SpinnerSizeSm from './spinners/SpinnerSizeSm';
import { toast } from 'react-toastify';
import CustomToastContainer from './toasts/CustomToastContainer';
import { ToastOptions } from '../utils/ToastConfig';
import { formatDistanceToNow } from 'date-fns';

function ListItem({ payment, index }) {
    const secondaryClass = index % 2 === 1 ? "list-group-item-primary" : "";
    const amount = parseFloat(payment.amount).toFixed(2);
    const [loading, setLoading] = useState(true);
    const [dataProvider, setDataProvider] = useState(true);
    const toastError = () => {
        toast.error('Erro ao buscar provider', ToastOptions);
    };

    const date = new Date(payment.dateCreated);
    const formattedDistance = formatDistanceToNow(date, { addSuffix: true });

    useEffect(() => {
        (async () => {
            try {
                const response = await GetDataCitizenById(payment.providerId);
                if (response.requestStatus === 200) {
                    setDataProvider(response.data);
                } else {
                    toastError();
                }
            } catch (error) {
                toastError();
            } finally {
                setLoading(false);
            }
        })();
    }, [payment]);

    const getStatusClass = () => {
        if (payment.status === 'WAITING') {
            return 'btn-info';
        } else if (payment.status === 'CANCELLED') {
            return 'btn-danger';
        } else if (payment.status === 'PAID') {
            return 'btn-success';
        }
    };

    return (
        <div className={`list-group-item list-group-item-action ${secondaryClass}`} key={index}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1"><FontAwesomeIcon icon={faCreditCard} /> {payment.paymentType === 'CREDIT_CARD' ? 'CREDIT CARD' : payment.paymentType}</h5>
                <p style={{ width: '7.5em' }} className={`sb-1 btn ${getStatusClass()}`}>{payment.status}</p>
                <p className="mb-1">$ {amount}</p>
                <small className="text-body-secondary">Provider:&nbsp;
                    {loading ? (
                        <SpinnerSizeSm />
                    ) : (
                        dataProvider.name
                    )}
                </small>
                <small className="text-body-secondary">{formattedDistance}</small>
            </div>
        </div>
    );
}

function ListPaymentsByCitizen({ dataPayment }) {
    return (
        <div className='mt-3'>
            <CustomToastContainer />
            <p className="fs-4">Lista de Pagamentos Recebidos</p>
            <div className="list-group mt-3">
                {!dataPayment || dataPayment.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                        No payments received
                    </div>
                ) : (
                    dataPayment.map((payment, index) =>
                        <ListItem payment={payment} index={index} key={index} />
                    )
                )}

            </div>
        </div>
    );
}

export default ListPaymentsByCitizen;