<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../../app/models/' . $class_name . '.php';
});

// get data from client
$input = json_decode(file_get_contents('php://input'), true);

$user_id = $input['user_id'];
$product_id = $input['product_id'];
$content = $input['content'];

// get data model from backend
$commentModel = new CommentModel();

$commentModel->createComment($content, $user_id, $product_id);
$user = $commentModel->getUser($user_id);

// return values i  s json string
echo json_encode(array(
    'user_id' => $user_id,
    'user' => json_encode($user),
    'product_id' => $product_id,
    'content' => $content
));
