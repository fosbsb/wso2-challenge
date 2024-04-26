import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faFile, faLocationDot, faMapLocationDot, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import imagem from '../images/img-02.jpeg';
import GetDataCep from '../api/apiGetCep';
import SpinnerSizeSm from './spinners/SpinnerSizeSm';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import CustomToastContainer from './toasts/CustomToastContainer';
import { ToastOptions } from '../utils/ToastConfig';
import InsertCitizen from '../api/citizen/apiInsertCitizen';
import SpinnerScreenLoad from './spinners/SpinnerScreenLoad';

function RegistrationForm({ nome, email }) {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        perfil: '',
        nome: '',
        email: '',
        telefone: '',
        documento: '',
        cep: '',
        endereco: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);

    useEffect(() => {
        setFormValues({
            ...formValues,
            nome: nome || '',
            email: email || '',
        });
    }, [nome, email]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleBlur = async (event) => {
        const { name, value } = event.target;
        if (name === 'cep' && value !== '_____-___') {
            setLoading(true);
            try {
                const response = await GetDataCep(value);
                if (response.requestStatus === 200) {
                    setFormValues({ ...formValues, endereco: response.data.logradouro + ', ' + response.data.bairro + ', ' + response.data.localidade + ' - ' + response.data.uf });
                } else {
                    setFormValues({ ...formValues, endereco: '' });
                    toast.warn('CEP Inválido ou não encontrado', ToastOptions);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async () => {
        setSubmitLoading(true);
        // Verifica se algum dos valores está vazio
        if (Object.values(formValues).some(value => value === '')) {
            toast.warn('Preencha todos os campos', ToastOptions);
            setSubmitLoading(false);
        } else {
            const { perfil, nome, email, telefone, documento, cep, endereco } = formValues;
            try {
                const response = await InsertCitizen(documento, email, nome, telefone, perfil, cep, endereco);
                if (response.requestStatus === 201) {
                    setLoadingPage(true);

                    navigate(`/profile/${response.data.id}`);

                    setTimeout(() => {
                        toast.success('Usuário cadastrado com sucesso', ToastOptions);
                    }, 1000);
                } else {
                    toast.error('Erro ao inserir usuário', ToastOptions);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitLoading(false);
            }
        }
    };

    return (
        <div>
            <CustomToastContainer />
            {loadingPage ? (
                <SpinnerScreenLoad />
            ) : (
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-pic js-tilt" data-tilt>
                                <img id="img-home" src={imagem} alt="IMG" />
                            </div>

                            <div className="login100-form">
                                <span className="login100-form-title">
                                    Formulário de Cadastro
                                </span>

                                <div className="wrap-input100 validate-input" data-validate="O Perfil é obrigatório">
                                    <select className="input100" name="perfil" value={formValues.perfil} onChange={handleChange}>
                                        <option value="" disabled hidden>Selecione o Perfil</option>
                                        <option value="CITIZEN">CITIZEN</option>
                                        <option value="PROVIDER">PROVIDER</option>
                                    </select>
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faBarsStaggered} />
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="O Nome é obrigatório">
                                    <input className="input100" type="text" name="nome" placeholder="Nome"
                                        value={formValues.nome}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="O E-mail é obrigatório e precisa ser válido. Ex: exemplo@exemplo.com">
                                    <input className="input100" type="text" name="email" placeholder="E-mail"
                                        value={formValues.email}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="O Telefone é obrigatório">
                                    <input className="input100" type="text" name="telefone" placeholder="Telefone"
                                        value={formValues.telefone}
                                        onChange={handleChange}
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="O Documento é obrigatório">
                                    <input className="input100" type="text" name="documento" placeholder="Documento"
                                        value={formValues.documento}
                                        onChange={handleChange}
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faFile} />
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="O CEP é obrigatório">
                                    <InputMask mask="99999-999" className="input100" type="text" name="cep" placeholder="CEP"
                                        value={formValues.cep}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={loading}
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="O Endereço é obrigatório">
                                    <input className="input100" type="text" name="endereco" placeholder="Endereço"
                                        value={formValues.endereco}
                                        readOnly
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        {loading ? (
                                            <SpinnerSizeSm />
                                        ) : (
                                            <FontAwesomeIcon icon={faMapLocationDot} />
                                        )
                                        }
                                    </span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button id="btnCadastrarUsuario" className="login100-form-btn" type="button"
                                        onClick={!submitLoading ? handleSubmit : null}
                                        disabled={loading || submitLoading}
                                    >
                                        {submitLoading ? (
                                            <SpinnerSizeSm />
                                        ) : (
                                            'Cadastrar'
                                        )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegistrationForm;