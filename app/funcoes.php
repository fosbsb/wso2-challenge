<?php

/**
 * Faz a chamada para qualquer API.
 * devolve um json como resposta se a api tiver retorno deste tipo
 * @param URL - Completa com parametros GET.
 * @param METHOD - GET, POST, PUT, DELETE.
 * @param PAYLOAD - corpo que será enviado no formato json_encode(array(titulo => conteudo)).
 */
function consumoAPI(string $url, string $metodo, string $payload, array $header = null)
{
    $arrayHeader = array('Content-Type: application/json');
    if (is_array($header)) {
        $arrayHeader = array_merge($arrayHeader, $header);
    }

    /* Abre a conexão */
    $ch = curl_init();

    /* Definindo a URL */
    curl_setopt($ch, CURLOPT_HTTPHEADER, $arrayHeader);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    if ($metodo == "POST") {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    } elseif ($metodo == "PUT") {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    } elseif ($metodo == "DELETE") {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    }

    $json = curl_exec($ch);

    /* Decodificando o objeto $json */
    $resultado = json_decode($json);

    /* Fechamos a conexão */
    return $resultado;
}
