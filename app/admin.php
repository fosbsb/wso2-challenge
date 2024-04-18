<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administração de Usuários</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <style>
        .user-card {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            /* margin-right: 10px; */
            /* margin-left: 10px; */
            margin-bottom: 20px;
            flex: 1;
            min-width: 400px;
        }

        .user-photo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 20px;
            display: block;
        }

        #userList{
            display: flex;
            flex-wrap: wrap;
            flex-flow: row wrap;
            gap: 10px;
        }

        a {
            text-decoration: none;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">NomeDoSistema</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Usuários</a>
                    </li>
                </ul>
                <a href="/">
                    <button class="btn btn-outline-danger" type="button">Sair</button>
                </a>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <h1 class="mb-4">Administração de Usuários</h1>
        <div id="userList">
            <div class="user-card col position-relative">
                
                <h3>João</h3>
                <p><strong>Email:</strong> joao@example.com</p>
                <p><strong>Telefone:</strong> 123456789</p>
                <p><strong>Documento:</strong> 123456789</p>
                <p><strong>Perfil:</strong> Padrão</p>
                <a href="#" class="btn btn-primary">Ver Documento</a>
                <div class="position-absolute bottom-0 end-0 m-3">
                    <img src="img/cabeca-de-desenho-animado-isolada_1308-150493.avif" alt="João" class="user-photo">
                    <a href="/aprovar">
                        <button class="btn btn-outline-success" type="button">Aprovar</button>
                    </a>
                    <a href="/reprovar">
                        <button class="btn btn-outline-danger" type="button">Reprovar</button>
                    </a>
                </div>
            </div>
            <div class="user-card col position-relative">
                <h3>Maria</h3>
                <p><strong>Email:</strong> maria@example.com</p>
                <p><strong>Telefone:</strong> 987654321</p>
                <p><strong>Documento:</strong> 987654321</p>
                <p><strong>Perfil:</strong> Avançado</p>
                <a href="#" class="btn btn-primary">Ver Documento</a>
                <div class="position-absolute bottom-0 end-0 m-3">
                    <img src="img/cabeca-de-desenho-animado-isolada_1308-150493.avif" alt="João" class="user-photo">
                    <a href="/aprovar">
                        <button class="btn btn-outline-success" type="button">Aprovar</button>
                    </a>
                    <a href="/reprovar">
                        <button class="btn btn-outline-danger" type="button">Reprovar</button>
                    </a>
                </div>
            </div>
            <div class="user-card col position-relative">
                <h3>Maria</h3>
                <p><strong>Email:</strong> maria@example.com</p>
                <p><strong>Telefone:</strong> 987654321</p>
                <p><strong>Documento:</strong> 987654321</p>
                <p><strong>Perfil:</strong> Avançado</p>
                <a href="#" class="btn btn-primary">Ver Documento</a>
                <div class="position-absolute bottom-0 end-0 m-3">
                    <img src="img/cabeca-de-desenho-animado-isolada_1308-150493.avif" alt="João" class="user-photo">
                    <a href="/aprovar">
                        <button class="btn btn-outline-success" type="button">Aprovar</button>
                    </a>
                    <a href="/reprovar">
                        <button class="btn btn-outline-danger" type="button">Reprovar</button>
                    </a>
                </div>
            </div>
            <div class="user-card col position-relative">
                <h3>Maria</h3>
                <p><strong>Email:</strong> maria@example.com</p>
                <p><strong>Telefone:</strong> 987654321</p>
                <p><strong>Documento:</strong> 987654321</p>
                <p><strong>Perfil:</strong> Avançado</p>
                <a href="#" class="btn btn-primary">Ver Documento</a>
                <div class="position-absolute bottom-0 end-0 m-3">
                    <img src="img/cabeca-de-desenho-animado-isolada_1308-150493.avif" alt="João" class="user-photo">
                    <a href="/aprovar">
                        <button class="btn btn-outline-success" type="button">Aprovar</button>
                    </a>
                    <a href="/reprovar">
                        <button class="btn btn-outline-danger" type="button">Reprovar</button>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossorigin="anonymous"></script>
</body>

</html>