<?php
class UserModel extends Database
{
    public function login($username, $password)
    {
        $sql = parent::$connection->prepare("SELECT * FROM users  WHERE `username` = ? AND `password` = ? ");
        $sql->bind_param('ss', $username, $password);
        return parent::select($sql);
    }
}