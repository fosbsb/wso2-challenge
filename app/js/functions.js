class Funcoes {
    constructor() {
        this.requisicaoAjax = function (type, data, url, dataType, callbackSuccess) {
            $.ajax({
                type: type,
                url: url,
                data,
                async: false,
                dataType: dataType,
                success: callbackSuccess,
                error: function (erro) {
                    alert('Aconteceu um erro ao realizar requisição, por favor contate a equipe de suporte - ' + erro);
                }
            });
        };

        this.carregarComponente = function (dir, component) {
            const url = dir + component + '.php';
            const type = 'GET';
            const data = {};
            const dataType = 'html';
            const callbackSuccess = function (response) {
                $("#conteudo").html(response);
            };

            if (component == 'formCadastro') {
                $('#nav-current').html('Home');
            }else if(component == 'admin'){
                $('#nav-current').html('Usuários');
            }

            this.requisicaoAjax(type, data, url, dataType, callbackSuccess);
        };

        this.enviarDados = function () {
            this.carregarComponente('components/', 'admin');
        };
    }
}