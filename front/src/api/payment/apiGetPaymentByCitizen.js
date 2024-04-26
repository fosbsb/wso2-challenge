import axios from 'axios';
import { GetToken } from '../authentication/apiAuth';

async function GetDataPaymentByCitizen(id) {
    try {
        const apiUrl = process.env.REACT_APP_URL_GET_PAYMENT_BY_CITIZEN + id;
        const token = await GetToken();
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token,
            }
        });

        const result = {
            data: response.data,
            requestStatus: response.status
        }

        return result;
    } catch (error) {
        return 'Erro ao buscar dados de pagamento:' + error;
    }
}

export default GetDataPaymentByCitizen;