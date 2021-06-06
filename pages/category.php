<?php
require_once './../config/database.php';
require_once './../config/config.php';
spl_autoload_register(function ($class_name) {
    require './../app/models/' . $class_name . '.php';
});

$id = 0;
if (!empty($_GET['id'])) {
    $id = $_GET['id'];
}

$productModel = new ProductModel();
$productList = [];
$productList = $productModel->getProductsByCategory($id);

$categoryModel = new CategoryModel();
$categoryList = $categoryModel->getCategories();

?>
<!-- Header Section Start -->
<?php include_once('./../layouts/Header.php'); ?>
<!-- Header Section End -->

<!-- Main Section Start -->
<div class="container">
    <div class="row">
        <?php
        foreach ($productList as $item) {
        ?>
            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="card mt-3">
                    <?php
                    $productPath = strtolower(str_replace(' ', '-', $item['product_name'])) . '-' . $item['id'];
                    ?>
                    <a href="product-detail.php/<?php echo $productPath; ?>">
                        <img style="height: 333.4px" src="./../public/images/<?php echo $item['product_photo'] ?>" class="card-img-top img-fluid" alt="...">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title" style="height: 5.5rem;" onclick="getProduct(<?php echo $item['id'] ?>)"><?php echo $item['product_name'] ?></h5>
                        <p class="card-text"><?php echo $item['product_price'] ?></p>
                    </div>
                    <div class="card-footer text-center">
                        <a href="product-detail.php/<?php echo $productPath; ?>" class="btn btn-primary">Show detail</a>
                        <a href="update-product.php?id=<?php echo $item['id'] ?>" class="btn btn-primary">Update product</a>
                    </div>
                </div>
            </div>
        <?php
        }
        ?>

    </div>
</div>
<!-- Main Section End -->
<!-- Footer Section Start -->
<?php include_once('./../layouts/Footer.php'); ?>