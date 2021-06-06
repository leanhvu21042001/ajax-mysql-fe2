<?php
require_once './config/database.php';
spl_autoload_register(function ($class_name) {
    require './app/models/' . $class_name . '.php';
});
$categoryModel = new CategoryModel();
$categoryList = $categoryModel->getCategories();
?>

<!-- Header Section Start -->
<?php include_once('./layouts/Header.php'); ?>
<!-- Header Section End -->


<section class="container-fluid  mt-5">
    <div class="row">
        <div class="col">
            <a class="btn btn-primary" href="http://localhost/ajax_mysql_fe2/pages/create-product.php">Create Product</a>
        </div>
    </div>

    <div class="row">
        <!-- Categories -->
        <div class="col-md-3 sm-12 ">
            <div class="list-group mt-3">
                <?php
                foreach ($categoryList as $item) {
                ?>
                    <label class="list-group-item">
                        <input class="form-check-input me-1" name="categories" type="checkbox" value="<?php echo $item['id']; ?>">
                        <?php echo $item['category_name']; ?>
                    </label>
                <?php
                }
                ?>
            </div>
        </div>

        <div class="col-md-9 sm-12 ">
            <!-- Products -->
            <div id="result" class="row">
            </div>

            <!-- Load more button -->
            <button id="load_more-products" type="button">
                <span class="button__text">Load More</span>
            </button>
        </div>
    </div>
</section>
<!-- like box -->

<!-- Modal -->
<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body"></div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!-- bootstrap scripts -->
<script src="./public/js/bootstrap.model.js"></script>
<!-- <script type="module" src="./public/js/script.js"></script> -->
<script type="module" src="./public/js/script_05602021.js"></script>

<!-- Footer Section Start -->
<?php include_once('./layouts/Footer.php'); ?>