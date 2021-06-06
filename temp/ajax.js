async function getProduct(productId) {
    // Buoc 1:
    const url = "productdetail.php";
    const data = { id: productId }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });

    // Buoc 2:
    const result = await response.json();

    // test
    console.log(" lav-result: ", result);

    // Hien thi giao dien
    // const divResult = document.querySelector('#result');
    // divResult.innerHTML = `${result.product_description}`;

    // hien thi modal
    var myModal = new bootstrap.Modal(document.getElementById('productModal'));
    myModal.show();

    // 
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    // hien thi ra dialog
    modalTitle.innerHTML = `${result.product_name}`;
    modalBody.innerHTML = `${result.product_description}`;    
}

const categoriesCheckbox = document.querySelectorAll('input[class="category"]');
console.log(categoriesCheckbox);

async function getProductByCategories(productId) {
    // Buoc 1:
    let url = "listproduct_by_categories.php";
    let data = { id: productId }
    const category = document.querySelectorAll('.category');
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data),
    });



    // Buoc 2: ket qua tra ve la mot jason
    const result = await response.json();

    // Hien thi giao dien    
    const divResult = document.querySelector('#result');
    divResult.innerHTML = ''
    
    // allProducts.forEach(item => {
    result.forEach(item => {
        divResult.innerHTML += 
        `<div class="col-md-4">

        <div class="card">
            <a href="product.php/<?php echo $productPath; ?>">
                <img src="./public/images/${item.product_photo}" class="card-img-top" alt="...">
            </a>
            <div class="card-body">
                <h5 class="card-title" onclick="getProduct(${item.product_id})">${item.product_name}</h5>
                <p class="card-text">${item.product_price}</p>
            </div>
        </div>
    </div>`
        
    });
}




