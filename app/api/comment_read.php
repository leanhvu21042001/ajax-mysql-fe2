<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../../app/models/' . $class_name . '.php';
});

// get data from client
$input = json_decode(file_get_contents('php://input'), true);

$product_id = $input['product_id'];

// get data model from backend
$commentModel = new CommentModel();
$items = [];

$items = $commentModel->getCommentByProductID($product_id);

// return values is json string
echo json_encode($items);
