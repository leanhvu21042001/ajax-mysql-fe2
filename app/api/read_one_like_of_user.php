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
    echo json_encode(array(
        'message' => "Not result.",
        'check' => false
    ));
} else {
    
    echo json_encode(array(
        'message' => "One result.",
        'check' => true,
        'read' => $read[0],
    ));
}
