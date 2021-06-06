<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
  require './../../app/models/' . $class_name . '.php';
});

// get data from client
$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'];

// get data model from backend
$productModel = new ProductModel();
if ($id != '') {
  $item = $productModel->getProductById($id);
} else {
  $item = [];
}

// return values is json string
echo json_encode($item);
