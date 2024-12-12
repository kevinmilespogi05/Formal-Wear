<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/services/ProductService.php';
require_once __DIR__ . '/services/CartService.php';
require_once __DIR__ . '/services/AccService.php';

$db = (new Connection())->connect();

$productService = isset($_SESSION['user_id']) ? new ProductService($db, $_SESSION['user_id'], $_SESSION['token']) : null;
$cartService = isset($_SESSION['user_id']) ? new CartService($db, $_SESSION['user_id'], $_SESSION['token']) : null;
$userService = new UserService($db);

$method = $_SERVER['REQUEST_METHOD'];
$url = $_GET['request'] ?? '';
$request = explode('/', trim($url, '/'));

function requireAuthentication()
{
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['token'])) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized"]);
        exit();
    }

    // Validate token
    global $userService;
    $tokenValidation = json_decode($userService->validateToken($_SESSION['token']), true);
    if (!$tokenValidation['valid']) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid token."]);
        exit();
    }
}

switch ($method) {
    case 'GET':
        switch ($request[0]) {
            case 'products':
                requireAuthentication();
                echo $productService->readProducts();
                break;
            case 'product-listing':
                requireAuthentication();
                echo $productService->readAllProducts();
                break;
            case 'products-read':
                $id = $_GET['id'] ?? null;
                if (!empty($id)) {
                    echo $productService->readOneProduct($id);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Product ID is required"]);
                }
                break;
            case 'carts':
                requireAuthentication();
                echo $cartService->readCarts();
                break;
            case 'carts-read':
                $id = $_GET['id'] ?? null;
                if (!empty($id)) {
                    echo $cartService->readOneCart($id);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Cart ID is required"]);
                }
                break;
            case 'check_login_status':
                echo $userService->checkLoginStatus();
                break;
            default:
                http_response_code(404);
                echo json_encode(["error" => "Endpoint not found"]);
        }
        break;

    case 'POST':
        switch ($request[0]) {
            case 'products-create':
                requireAuthentication();
                echo $productService->createProduct();
                break;
            case 'carts-create':
                requireAuthentication();
                $data = json_decode(file_get_contents("php://input"));
                echo $cartService->createCart($data);
                break;
            case 'products-update':
                requireAuthentication();
                $id = $request[1] ?? null;
                if (!empty($id)) {
                    echo $productService->updateProduct($id);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Product ID is required"]);
                }
                break;
            case 'carts-update':
                requireAuthentication();
                $data = json_decode(file_get_contents("php://input"));
                echo $cartService->updateCart($data);
                break;
            case 'login':
                $data = json_decode(file_get_contents("php://input"), true);
                echo $userService->loginUser($data);
                break;
            case 'logout':
                echo $userService->logoutUser();
                break;
            case 'register':
                $data = json_decode(file_get_contents("php://input"), true);
                echo $userService->registerUser($data);
                break;
            case 'set_session':
                $data = json_decode(file_get_contents("php://input"), true);
                echo $userService->setSession($data);
                break;
            default:
                http_response_code(404);
                echo json_encode(["error" => "Endpoint not found"]);
        }
        break;

    case 'DELETE':
        switch ($request[0]) {
            case 'products-delete':
                requireAuthentication();
                $id = $request[1] ?? null; // Extract the product ID from the URL parameter
                if (!empty($id)) {
                    echo $productService->deleteProduct($id);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Product ID is required"]);
                }
                break;
            case 'carts-delete':
                requireAuthentication();
                $id = $request[1] ?? null; // Extract the cart ID from the URL parameter
                if (!empty($id)) {
                    echo $cartService->deleteCart($id);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Cart ID is required"]);
                }
                break;
            default:
                http_response_code(404);
                echo json_encode(["error" => "Endpoint not found"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}
