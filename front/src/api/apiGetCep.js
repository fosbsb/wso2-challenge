import axios from 'axios';
import { GetToken } from './authentication/apiAuth';

async function GetDataCep(cep) {
    try {
        const apiUrl = process.env.REACT_APP_URL_GET_CEP;
        const token = await GetToken();
        const response = await axios.get(apiUrl, {
            params: { cep },
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
        return 'Erro ao buscar dados da API de CEP:' + error;
    }
}

export default GetDataCep;