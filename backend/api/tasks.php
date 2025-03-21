<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once '../config.php';
require_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "YOUR_SECRET_KEY";


function getBearerToken()
{
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}


function validateJWT($secret_key)
{
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(["error" => "Token não fornecido"]);
        exit();
    }
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Token inválido: " . $e->getMessage()]);
        exit();
    }
}

if (in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'DELETE'])) {
    validateJWT($secret_key);
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


function getJsonInput()
{
    return json_decode(file_get_contents("php://input"), true);
}


$method = $_SERVER['REQUEST_METHOD'];


$request_uri = trim($_SERVER['REQUEST_URI'], '/');
$request_parts = explode('/', $request_uri);


$id = isset($request_parts[2]) ? (int)$request_parts[2] : null;


if (in_array($method, ['PUT', 'DELETE']) && empty($id)) {
    http_response_code(400);
    echo json_encode(['error' => 'ID da tarefa não fornecido']);
    exit();
}

switch ($method) {
    case 'GET':
        if (!empty($request_parts[2])) {

            $id = (int)$request_parts[2];
            $stmt = $pdo->prepare("SELECT * FROM tasks WHERE id = ?");
            $stmt->execute([$id]);
            $task = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($task) {
                echo json_encode($task);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Tarefa não encontrada']);
            }
        } else {

            $stmt = $pdo->query("SELECT * FROM tasks");
            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($tasks);
        }
        break;

    case 'POST':
        $data = getJsonInput();
        if (!isset($data['title']) || !isset($data['description']) || !isset($data['status'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados inválidos']);
            exit();
        }
        $stmt = $pdo->prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)");
        if ($stmt->execute([$data['title'], $data['description'], $data['status']])) {
            $id = $pdo->lastInsertId();
            http_response_code(201);
            echo json_encode(['message' => 'Tarefa criada', 'id' => $id]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao criar tarefa']);
        }
        break;

    case 'PUT':

        $data = getJsonInput();


        $valid_status = ['pending', 'in_progress', 'completed'];
        if (!in_array($data['status'], $valid_status)) {
            http_response_code(400);
            echo json_encode(['error' => 'Status inválido']);
            exit();
        }

        $stmt = $pdo->prepare("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?");
        if ($stmt->execute([$data['title'], $data['description'], $data['status'], $id])) {
            echo json_encode(['message' => 'Tarefa atualizada']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao atualizar tarefa']);
        }
        break;

    case 'DELETE':

        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        if ($stmt->execute([$id])) {
            echo json_encode(['message' => 'Tarefa excluída']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao excluir tarefa']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        break;
}
