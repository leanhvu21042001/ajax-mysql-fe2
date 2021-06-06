<?php

$check_login = '!ok';
if (isset($_COOKIE['check_login'])) {
    $check_login = $_COOKIE['check_login'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="shortcut icon" href="https://www.facebook.com/photo?fbid=1188164914934304&set=a.112286422522164"> -->
    <title>Front End 2 - Lê Anh Vũ</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet">


    <!-- header css -->
    <link rel="stylesheet" href="./layouts/header.css">
</head>

<body>

    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="http://localhost/ajax_mysql_fe2/">[ღ ℒê Ąŋɦ Vũ ღ]</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="http://localhost/ajax_mysql_fe2/">Home</a>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li> -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category products
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <?php
                                foreach ($categoryList as $item) {
                                ?>
                                    <li>
                                        <a class="dropdown-item" href="http://localhost/ajax_mysql_fe2/pages/category.php?id=<?php echo $item['id']; ?>"><?php echo $item['category_name']; ?></a>
                                    </li>
                                <?php
                                }
                                ?>
                            </ul>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="http://localhost/ajax_mysql_fe2/pages/manage-products.php">Manage products</a>
                        </li>
                    </ul>

                    <!-- search products by name -->
                    <form class="d-flex" id="submitSearch">
                        <input id="inputSearchChange" name="searchName" class="form-control me-2" type="search" placeholder="Search" autocomplete="off">
                        <div class="list_names">
                            <ul class="list_names-result">
                            </ul>
                        </div>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul class="navbar-nav mb-2 mb-lg-0 mx-4">
                        <li class="nav-item">
                            <?php
                            if ($check_login == 'ok') {
                                echo '<a class="btn btn-danger" aria-current="page" href="http://localhost/ajax_mysql_fe2/pages/logout.php?logout=1">Logout</a>';
                                echo '<span class="px-4 mark text-danger" style="font-weight: 600;">' . $_COOKIE['name'] . '</span>';
                            } else {
                                echo '<a class="btn btn-success" aria-current="page" href="http://localhost/ajax_mysql_fe2/pages/login.php">Login</a>';
                            }
                            ?>

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>