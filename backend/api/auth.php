<?php

require_once '../config.php';
require_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;

header("Content-Type: application/json; charset=UTF-8");

$secret_key = "YOUR_SECRET_KEY";

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    if ($username === 'admin' && $password === 'admin') {
        $issued_at = time();
        $expiration_time = $issued_at + 3600;
        $payload = [
            "iat"  => $issued_at,
            "exp"  => $expiration_time,
            "data" => [
                "username" => $username
            ]
        ];

        $jwt = JWT::encode($payload, $secret_key, 'HS256');
        echo json_encode([
            "message" => "Autenticação realizada com sucesso",
            "token"   => $jwt
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Credenciais inválidas"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Dados insuficientes"]);
}
