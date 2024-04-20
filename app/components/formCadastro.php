<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
                <img id="img-home" src="images/img-02.jpeg" alt="IMG">
            </div>

            <form class="login100-form validate-form">
                <span class="login100-form-title">
                    Formulário de Cadastro
                </span>

                <div class="wrap-input100 validate-input" data-validate="O Perfil é obrigatório">
                    <select class="input100" id="perfil" onchange="toggleForm()">
                        <option value="" selected disabled hidden>Selecione o Perfil</option>
                        <option value="padrao">Padrão</option>
                        <option value="avancado">Avançado</option>
                    </select>
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-list" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="O Nome é obrigatório">
                    <input class="input100" type="text" name="nome" placeholder="Nome">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="O E-mail é obrigatório e precisa ser válido. Ex: exemplo@exemplo.com">
                    <input class="input100" type="text" name="email" placeholder="E-mail">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="O Telefone é obrigatório">
                    <input class="input100" type="text" name="telefone" placeholder="Telefone">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="O Documento é obrigatório">
                    <input class="input100" type="text" name="documento" placeholder="Documento">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-file" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="O Anexo do Documento é obrigatório">
                    <label>Anexo do Documento</label>
                    <input type="file" name="anexo_documento" style="width: 100%;">
                </div>

                <div class="container-login100-form-btn">
                    <button id="btnCadastrarUsuario" class="login100-form-btn" type="button">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>