import axios from 'axios';
import { GetToken } from '../authentication/apiAuth';

async function InsertCitizen(documentNumber, email, name, phone, profile, cep, address) {
    try {
        const apiUrl = process.env.REACT_APP_URL_API_CITIZEN;
        const token = await GetToken();

        const payload = {
            id: null,
            dateCreated: null,
            country: "br",
            documentNumber: documentNumber,
            email: email,
            name: name,
            phone: phone,
            active: false,
            profile: profile,
            cep: cep.split('-').join(''),
            address: address
        };

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const result = {
            data: response.data,
            requestStatus: response.status
        }

        return result;
    } catch (error) {
        return 'Erro ao inserir usuário:' + error;
    }
}

export default InsertCitizen;
