<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../../app/models/' . $class_name . '.php';
});

$input = json_decode(file_get_contents('php://input'), true);
$loadMore = $input['loadMore'];

$page = $loadMore[0];
$perPage = $loadMore[1];

// var_dump($loadMore);
$productModel = new ProductModel();

$items = $productModel->getProductsByPage($perPage, $page);

echo json_encode($items);
