<?php
class LikeModel extends Database
{
    // get one like_product
    public function getLikeProductOfProductWithUserID($product_id, $user_id)
    {
        $sql = parent::$connection->prepare("SELECT * FROM `like_product` WHERE product_id=? AND user_id=?");
        $sql->bind_param('ii', $product_id, $user_id);
        return parent::select($sql);
    }

    // get all like_product
    public function getAllLikeProductOfProduct($product_id)
    {
        $sql = parent::$connection->prepare("SELECT * FROM `like_product`
            WHERE product_id=?");
        $sql->bind_param('i', $product_id);
        return parent::select($sql);
    }
    // create like_product
    public function createLikeProduct($product_id, $user_id, $len)
    {
        $sql = parent::$connection->prepare("INSERT INTO `like_product` ( `product_id`, `user_id`, `len`)
        VALUES (?, ?, ?)");
        $sql->bind_param('iii', $product_id, $user_id, $len);
        return $sql->execute();
    }

    // update like_product
    public function updateLikeProduct($product_id, $user_id, $len)
    {
        $sql = parent::$connection->prepare("UPDATE `like_product` SET `len` = ? WHERE `product_id` = ? AND `user_id` = ?");
        $sql->bind_param('iii', $len, $product_id, $user_id);
        return $sql->execute();
    }
}
