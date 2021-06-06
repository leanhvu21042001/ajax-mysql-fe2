<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../../app/models/' . $class_name . '.php';
});

$input = json_decode(file_get_contents('php://input'), true);

$checkCategories = $input['checkCategories'];

$productModel = new ProductModel();

if (count($checkCategories) == 0) {
    $items = $productModel->getProducts();
} else {
    $items = $productModel->getProductsByNCategories($checkCategories);
}

echo json_encode($items);