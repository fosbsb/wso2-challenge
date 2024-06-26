import axios from 'axios';
import { GetToken } from '../authentication/apiAuth';

async function GetDataCitizenByEmail(email, all) {
    try {
        const apiUrl = process.env.REACT_APP_URL_GET_CITIZEN_BY_SEARCH;
        const token = await GetToken();
        const response = await axios.get(apiUrl, {
            params: { email, all },
            headers: {
                'Authorization': token,
            },
            timeout: 30000
        });

        const result = {
            data: response.data,
            requestStatus: response.status
        }

        return result;
    } catch (error) {
        return 'Erro ao buscar dados do Usuário:' + error;
    }
}

export default GetDataCitizenByEmail;