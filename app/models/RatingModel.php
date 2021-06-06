<?php
class RatingModel extends Database
{
    // get one rating
    public function getRatingOfProductWithUserID($product_id, $user_id)
    {
        $sql = parent::$connection->prepare("SELECT * FROM `rating` WHERE product_id=? AND user_id=?");
        $sql->bind_param('ii', $product_id, $user_id);
        return parent::select($sql);
    }

    // get all rating
    public function getAllRatingOfProduct($product_id)
    {
        $sql = parent::$connection->prepare("SELECT * FROM `rating`
            WHERE product_id=?");
        $sql->bind_param('i', $product_id);
        return parent::select($sql);
    }
    // create rating
    public function createRating($product_id, $user_id, $len)
    {
        $sql = parent::$connection->prepare("INSERT INTO `rating` ( `product_id`, `user_id`, `len`)
        VALUES (?, ?, ?)");
        $sql->bind_param('iii', $product_id, $user_id, $len);
        return $sql->execute();
    }

    // update rating
    public function updateRating($product_id, $user_id, $len)
    {
        $sql = parent::$connection->prepare("UPDATE `rating` SET `len` = ? WHERE `product_id` = ? AND `user_id` = ?");
        $sql->bind_param('iii', $len, $product_id, $user_id);
        return $sql->execute();
    }
}
