<?php

$checkLogout = 'ok';
if (isset($_GET['logout'])) {
    setcookie("check_login", "", time() - (86400 * 30) - 1, "/");

    setcookie("id", "", time() - (86400 * 30) - 1, "/");
    setcookie("username", "", time() - (86400 * 30) - 1, "/");
    setcookie("name", "", time() - (86400 * 30) - 1, "/");

    header('location:http://localhost/hoc-php-ajax-mysql-front-end-2/index.php');
}
