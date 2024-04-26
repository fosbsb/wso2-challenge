import axios from 'axios';

export async function GetToken() {
    try {
        const apiUrl = process.env.REACT_APP_URL_GET_TOKEN;
        const headerAuthorization = process.env.REACT_APP_HEADER_AUTHORIZATION;

        const bodydata = new URLSearchParams();
        bodydata.append('grant_type', 'client_credentials');

        const response = await axios.post(apiUrl, bodydata, {
            headers: {
                'Authorization': headerAuthorization,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.token_type + ' ' + response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter token de acesso:', error);
        throw error;
    }
}