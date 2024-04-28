import axios from 'axios';
import { GetToken } from '../authentication/apiAuth';

// Function to create a new factory
async function createFactory(dataPayment) {
    const apiUrl = process.env.REACT_APP_URL_MAKE_FACTORY_BY_PAYMENT;
    const token = await GetToken();

    const payload = {
        id: 0,
        operationData: '',
        amount: dataPayment.amount,
        authorizationCode: '',
        cardNumber: dataPayment.cardNumber,
        cardBand: dataPayment.cardBrand,
        cardValidate: dataPayment.expiryDate,
        state: ''
    };

    try {
        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        return { data: response.data, requestStatus: response.status };
    } catch (error) {
        throw new Error('Error creating factory: ' + error);
    }
}

// Function to update payment
async function updatePayment(dataFactory, idPayment) {
    const apiUrl = process.env.REACT_APP_URL_MAKE_PAYMENT_BY_CITIZEN;
    const token = await GetToken();

    const payload = {
        authorizationNumber: dataFactory.authorizationCode,
        id: idPayment,
        status: 'PAID'
    };

    try {
        const response = await axios.put(apiUrl, payload, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        return { data: response.data, requestStatus: response.status };
    } catch (error) {
        throw new Error('Error updating payment: ' + error);
    }
}

// Function to make payment by the citizen
async function makePaymentByCitizen(dataPayment) {
    const apiUrl = process.env.REACT_APP_URL_MAKE_PAYMENT_BY_CITIZEN;
    const token = await GetToken();

    const payload = {
        amount: dataPayment.amount,
        authorizationNumber: null,
        citizenId: dataPayment.idCitizen,
        dateCreated: null,
        id: 0,
        notificationDate: null,
        paymentDate: null,
        paymentType: "CREDIT_CARD",
        providerId: dataPayment.idProvider,
        status: null,
        uuidCode: null
    };

    try {
        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            const responseFactory = await createFactory(dataPayment);

            if (responseFactory.requestStatus === 201) {
                const responseUpdatePayment = await updatePayment(responseFactory.data, response.data.id);
                return responseUpdatePayment;
            } else {
                throw new Error('Error creating factory');
            }
        } else {
            throw new Error('Error making payment');
        }
    } catch (error) {
        throw new Error('Error making payment: ' + error);
    }
}

export default makePaymentByCitizen;
