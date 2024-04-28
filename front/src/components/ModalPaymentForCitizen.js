import React, { useState, useMemo } from 'react';
import CurrencyInputField from 'react-currency-input-field';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { ToastOptions } from '../utils/ToastConfig';
import MakePaymentByCitizen from '../api/payment/apiMakePaymentByCitizen';
import SpinnerSizeSm from './spinners/SpinnerSizeSm';

function ModalPaymentForCitizen({ idCitizen, nameCitizen, idProvider }) {
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardBrand, setCardBrand] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const toastErrorPayment = () => {
        toast.error('Error when making payment', ToastOptions);
    }

    const maskString = useMemo(() => {
        return (str) => {
            if (str.length !== 19 || str.charAt(4) !== ' ' || str.charAt(9) !== ' ' || str.charAt(14) !== ' ') {
                return str;
            }

            const maskedPart = str.substring(5, 9).replace(/./g, '*');
            const maskedPart2 = str.substring(10, 14).replace(/./g, '*');

            return `${str.substring(0, 4)} ${maskedPart} ${maskedPart2} ${str.substring(15)}`;
        };
    }, []);

    const handleSubmit = async () => {
        // Verifica se todos os campos estão preenchidos
        if (!amount || !cardNumber || !expiryDate || !cardBrand) {
            toast.warn('Preencha todos os campos', ToastOptions);
            return;
        }

        const payload = {
            idProvider: parseInt(idProvider),
            idCitizen: idCitizen,
            amount: parseFloat(amount.replace(',', '.')),
            cardNumber: maskString(cardNumber),
            expiryDate: expiryDate,
            cardBrand: cardBrand
        };

        try {
            setLoadingSubmit(true);

            const response = await MakePaymentByCitizen(payload);
            if (response.requestStatus === 200) {
                toast.success('Payment made successfully', ToastOptions);
            } else {
                toastErrorPayment();
            }
        } catch (error) {
            toastErrorPayment();
        } finally {
            setLoadingSubmit(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setAmount('');
        setCardNumber('');
        setExpiryDate('');
        setCardBrand('');
    };

    return (
        <div className="modal fade" id="paymentForCitizen" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Make payment for {nameCitizen}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ textAlign: 'left' }}>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <CurrencyInputField
                                id="amount"
                                name="amount"
                                className="form-control"
                                placeholder="$0.00"
                                allowDecimals={true}
                                decimalScale={2}
                                prefix="$"
                                onValueChange={(value) => setAmount(value)}
                                value={amount}
                            />
                        </div>
                        <hr></hr>
                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <InputMask
                                mask="9999 9999 9999 9999"
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                name='card_number'
                                placeholder="XXXX XXXX XXXX XXXX"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardBrand" className="form-label">Flag</label>
                            <select
                                className="form-select"
                                id="cardBrand"
                                value={cardBrand}
                                onChange={(e) => setCardBrand(e.target.value)}
                            >
                                <option value="">Choose the flag...</option>
                                <option value="VISA">Visa</option>
                                <option value="MASTERCARD">Mastercard</option>
                                <option value="AMEX">American Express</option>
                                <option value="DISCOVER">Discover</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="expiryDate" className="form-label">Expiration date</label>
                            <InputMask
                                mask="99/99"
                                type="text"
                                className="form-control"
                                id="expiryDate"
                                placeholder="MM/AA"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loadingSubmit}
                        >
                            {loadingSubmit ? (
                                <SpinnerSizeSm />
                            ) : (
                                'To Save'
                            )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPaymentForCitizen;
