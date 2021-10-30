<?php
class UserModel extends Database
{
    public function login($username, $password)
    {
       
        $sql = parent::$connection->prepare("SELECT * FROM `users`  WHERE `username` = ? AND `password` = ? ");


        var_dump($sql);
        var_dump($username, $password);
        die; 
        $sql->bind_param('ss', $username, $password);
       

        return parent::select($sql);
    }
}