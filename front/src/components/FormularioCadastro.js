import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faFile, faFileImport } from '@fortawesome/free-solid-svg-icons';
import imagem from '../images/img-02.jpeg';

const FormularioCadastro = () => {
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img id="img-home" src={imagem} alt="IMG" />
                    </div>

                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            Formulário de Cadastro
                        </span>

                        <div className="wrap-input100 validate-input" data-validate="O Nome é obrigatório">
                            <input className="input100" type="text" name="nome" placeholder="Nome" />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="O E-mail é obrigatório e precisa ser válido. Ex: exemplo@exemplo.com">
                            <input className="input100" type="text" name="email" placeholder="E-mail" />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                            <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="O Telefone é obrigatório">
                            <input className="input100" type="text" name="telefone" placeholder="Telefone" />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                            <FontAwesomeIcon icon={faPhone} />
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="O Documento é obrigatório">
                            <input className="input100" type="text" name="documento" placeholder="Documento" />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                            <FontAwesomeIcon icon={faFile} />
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="O Anexo do Documento é obrigatório" style={{ textAlign: 'left', background: '#e6e6e6', padding: '10px' }}>
                            <label><FontAwesomeIcon icon={faFileImport} /> Anexo do Documento</label>
                            <input type="file" name="anexo_documento" style={{ width: '100%' }} />
                        </div>

                        <div className="container-login100-form-btn">
                            <button id="btnCadastrarUsuario" className="login100-form-btn" type="button">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormularioCadastro;