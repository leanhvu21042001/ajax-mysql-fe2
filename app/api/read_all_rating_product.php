<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../../app/models/' . $class_name . '.php';
});

$input = json_decode(file_get_contents('php://input'), true);

$product_id = $input['product_id'];

$ratingModel = new RatingModel;

$read = $ratingModel->getAllRatingOfProduct($product_id);
if (count($read) === 0) {
    echo json_encode(array(
        'message' => "Can't read rating this product",
        'check' => false,
        'product_id' => $product_id
    ));
} else{
    echo json_encode($read);
}