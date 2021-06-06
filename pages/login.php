<?php
require_once './../config/database.php';
spl_autoload_register(function ($class_name) {
    require './../app/models/' . $class_name . '.php';
});

$userModel = new UserModel;
$username = '';
$password = '';
$checkLogin = false;
$user = [];

if (isset($_POST['username'])) {
    $username = $_POST['username'];
    if (isset($_POST['password'])) {
        $password = $_POST['password'];

        $checkLogin = count($userModel->login($username, $password)) ? true : false;

        $user = $userModel->login($username, $password)[0];

        // 'id' => int 1
        // 'name' => string 'Lê Anh Vũ' (length=11)
        // 'status' => int 1
        // 'username' => string 'lav' (length=3)
        // 'password' => string '1' (length=1)
    }
}


if ($checkLogin == true) {
    // 86400 = 1 day
    
    setcookie("check_login", "ok", time() + (86400 * 30), "/");
    setcookie("id", $user['id'], time() + (86400 * 30), "/");
    setcookie("name", $user['name'], time() + (86400 * 30), "/");
    setcookie("username", $user['username'], time() + (86400 * 30), "/");
    header('location:http://localhost/ajax_mysql_fe2/index.php');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <!-- Form login-->
        <form method="post">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" class="form-control" placeholder="Enter your username . . . " aria-describedby="helpId">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="Enter your password . . . " aria-describedby="helpId">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</body>

</html>