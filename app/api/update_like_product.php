<?php
require_once './../../config/database.php';
require_once './../../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../../app/models/' . $class_name . '.php';
});


$input = json_decode(file_get_contents('php://input'), true);


$user_id = $input['user_id'];
$product_id = $input['product_id'];
$len = $input['len'];

$likeProductModel = new LikeModel;

$read = $likeProductModel->getLikeProductOfProductWithUserID($product_id, $user_id);

if (count($read) === 0) {
    // create likeProduct
    $likeProductModel->createLikeProduct($product_id, $user_id, $len);
    echo json_encode(array(
        'message' => "Liked product",
        'len' => $len,
        'product_id' => $product_id
    ));
} else {
    // update likeProduct
    $likeProductModel->updateLikeProduct($product_id, $user_id, $len);
    echo json_encode(array(
        'message' => "Updated like product",
        'len' => $len,
        'product_id' => $product_id
    ));
}
