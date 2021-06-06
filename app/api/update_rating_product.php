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

$ratingModel = new RatingModel;

$read = $ratingModel->getRatingOfProductWithUserID($product_id, $user_id);

if (count($read) === 0) {
    // create rating
    $ratingModel->createRating($product_id, $user_id, $len);
    echo json_encode(array(
        'message' => "Rating created",
        'len' => $len
    ));
} else {
    // update rating
    $ratingModel->updateRating($product_id, $user_id, $len);
    echo json_encode(array(
        'message' => "Rating updated",
        'len' => $len
    ));
}
