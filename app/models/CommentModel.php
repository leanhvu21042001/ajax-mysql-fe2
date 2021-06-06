<?php
class CommentModel extends Database
{

    public function getUser($user_id)
    {
        $sql = parent::$connection->prepare("SELECT * FROM users  WHERE id=?");
        $sql->bind_param('i', $user_id);
        return parent::select($sql);
    }
    
    public function getCommentByProductID($product_id)
    {
        $sql = parent::$connection->prepare("SELECT * FROM comment 
        INNER JOIN users on `users`.`id` = `comment`.`user_id`
        WHERE product_id=?");
        $sql->bind_param('i', $product_id);
        return parent::select($sql);
    }
    
    // Thêm sản phẩm
    public function createComment($content, $user_id, $product_id)
    {
        $sql = parent::$connection->prepare("INSERT INTO `comment` (`content`, `user_id`, `product_id`) VALUES (?, ?, ?);");
        $sql->bind_param('sii', $content, $user_id, $product_id);
        return $sql->execute();
    }
    
    // Cập nhật sản phẩm
    // public function updateProduct($productName, $productDescription, $productPrice, $productPhoto, $id)
    // {
    //     $sql = parent::$connection->prepare("UPDATE `products` SET `product_name` = ?, `product_description` = ?, `product_price` = ?, `product_photo` = ? WHERE `products`.`id` = ?;");
    //     $sql->bind_param('ssisi', $productName, $productDescription, $productPrice, $productPhoto, $id);
    //     return $sql->execute();
    // }

    // Xóa sản phẩm
    // public function deleteProduct($id)
    // {
    //     $sql = parent::$connection->prepare("DELETE FROM `products` WHERE `products`.`id` = ?");
    //     $sql->bind_param('i', $id);
    //     return $sql->execute();
    // }

    
    // public function getCommentByProductIDAndCommentID($id, $product_id)
    // {
    //     $sql = parent::$connection->prepare("SELECT * FROM comment INNER JOIN users on `users`.`id` = `comment`.`product_id`  WHERE id=? AND product_id=?");
    //     $sql->bind_param('ii', $id, $product_id);
    //     return parent::select($sql);
    // }
}