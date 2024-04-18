<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Estilos personalizados */
        .hidden {
            display: none;
        }
    </style>
</head>

<body>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <p class="fs-1">Formulário de Cadastro</p>
                <form id="cadastroForm" action="admin.html">
                    <div class="mb-3">
                        <label for="perfil">Perfil:</label>
                        <select class="form-control" id="perfil" onchange="toggleForm()">
                            <option value="padrao">Padrão</option>
                            <option value="avancado">Avançado</option>
                        </select>
                    </div>
                    <div id="primeiroForm">
                        <div class="mb-3">
                            <label for="nome">Nome:</label>
                            <input type="text" class="form-control" id="nome" name="nome">
                        </div>
                        <div class="mb-3">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" name="email">
                        </div>
                        <div class="mb-3">
                            <label for="telefone">Telefone:</label>
                            <input type="tel" class="form-control" id="telefone" name="telefone">
                        </div>
                        <div class="mb-3">
                            <label for="documento">Documento:</label>
                            <input type="text" class="form-control" id="documento" name="documento">
                        </div>
                        <div class="mb-3">
                            <label for="anexoDocumento">Anexo do Documento:</label>
                            <input type="file" class="form-control" id="anexoDocumento" name="anexoDocumento">
                        </div>
                    </div>
                    <!-- Formulário avançado oculto por padrão -->
                    <div class="hidden" id="segundoForm">
                        <div class="mb-3">
                            <label>Segundo formulário:</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        function toggleForm() {
            var perfil = document.getElementById("perfil").value;
            var primeiroForm = document.getElementById("primeiroForm");
            var segundoForm = document.getElementById("segundoForm");

            if (perfil === "avancado") {
                primeiroForm.classList.add("hidden");
                segundoForm.classList.remove("hidden");
            } else {
                primeiroForm.classList.remove("hidden");
                segundoForm.classList.add("hidden");
            }
        }
    </script>

</body>

</html>