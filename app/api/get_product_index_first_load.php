<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../../app/models/' . $class_name . '.php';
});

$input = json_decode(file_get_contents('php://input'), true);

$perPage = 3;
$page = 1;

$productModel = new ProductModel();
$productList = $productModel->getProductsByPage($perPage, $page);

if (count($productList) < 1) {
    echo json_encode([]);
} else echo json_encode($productList);