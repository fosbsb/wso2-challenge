import axios from 'axios';
import { GetToken } from '../authentication/apiAuth';

async function UpdateStatusCitizen(id, status) {
    try {
        const apiUrl = status ? process.env.REACT_APP_URL_UPDATE_STATUS_ENABLE_CITIZEN_BY_ID : process.env.REACT_APP_URL_UPDATE_STATUS_DISABLE_CITIZEN_BY_ID;
        const token = await GetToken();
        const response = await axios.put(`${apiUrl}?id=${id}`, null, {
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
        return 'Erro ao atualizar status do Usuário:' + error;
    }
}

export default UpdateStatusCitizen;
