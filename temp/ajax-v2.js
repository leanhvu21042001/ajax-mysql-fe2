const URL_API = `http://localhost/hoc-php-ajax-mysql-front-end-2/app/api/`;
const URL_PUBLIC_IMG = `http://localhost/hoc-php-ajax-mysql-front-end-2/`;
//
const categoriesCheckbox = document.querySelectorAll('input[name="categories"]');
let checkedCate = [];
categoriesCheckbox.forEach(checkbox => checkbox.addEventListener('change', function() {
    if (this.checked) {
        checkedCate.push(this.value);
    } else {
        const valueIndex = checkedCate.indexOf(this.value);
        if (valueIndex !== -1) {
            checkedCate.splice(valueIndex, 1);
        }
    }

    // console.log(checkedCate);
    getProductsByCategories(checkedCate);
}));
// 
async function getProductsByCategories(checkCategories) {
    // Buoc 1:
    const url = `${URL_API}listproduct_by_categories.php`;
    const data = {
        checkCategories: checkCategories
    }
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

    const divResult = document.querySelector('#result');
    divResult.innerHTML = '';
    result.forEach(item => {
        divResult.innerHTML +=
            `<div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div class="card mt-3">
                    <a href="${URL_PUBLIC_IMG}/product-detail.php/<?php echo $productPath; ?>">
                        <img style="height: 333.4px" src="${URL_PUBLIC_IMG}/public/images/${item.product_photo}" class="card-img-top" alt="...">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title" style="height: 5.5rem;" onclick="getProduct(${item.product_id})">${item.product_name}</h5>
                        <p class="card-text">${item.product_price}</p>
                        <a href="${URL_PUBLIC_IMG}/product-detail.php/<?php echo $productPath; ?>" class="btn btn-primary">Show detail</a>
                    </div>
                </div>
            </div>`;
    });
}

// point to  search form elements
const inputSearchChange = document.querySelector('#inputSearchChange');
const submitSearch = document.querySelector('#submitSearch');
const listNameResult = document.querySelector(".list_names-result");

// show  name of list  products
inputSearchChange.addEventListener('focusin', e => {
    let searchName = e.target.value
    getProductsName(searchName).then(result => {
        showListKeywords(result);
    });
});
inputSearchChange.addEventListener('keyup', e => {
    let searchName = e.target.value
    getProductsName(searchName).then(result => {
        showListKeywords(result);
    });
});

// show products on submit form search
submitSearch.addEventListener('submit', e => {
    e.preventDefault();
    let searchName = inputSearchChange.value
    showProducts(searchName);
});

// searchProducts "php:"
async function getProductsName(searchName) {
    // Buoc 1:
    const url = `${URL_API}getProductsByName.php`;
    const data = {
        searchName: searchName
    };
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
    return result

}

//
function showProducts(searchName) {

    getProductsName(searchName).then(result => {
        const divResult = document.querySelector('#result');
        divResult.innerHTML = '';
        result.forEach(item => {
            divResult.innerHTML +=
                `<div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div class="card mt-3">
                    <a href="${URL_PUBLIC_IMG}/product.php/<?php echo $productPath; ?>">
                        <img style="height: 333.4px" src="${URL_PUBLIC_IMG}/public/images/${item.product_photo}" class="card-img-top" alt="...">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title" style="height: 5.5rem;" onclick="getProduct(${item.product_id})">${item.product_name}</h5>
                        <p class="card-text">${item.product_price}</p>
                        <a href="${URL_PUBLIC_IMG}/product.php/<?php echo $productPath; ?>" class="btn btn-primary">Show detail</a>
                    </div>
                </div>
            </div>`;
        });

    });
    inputSearchChange.value = searchName
    listNameResult.innerHTML = '';
}

// 
function showListKeywords(result) {
    let resultString = ``;

    result.forEach(item => {
        var pnameSubString = item.product_name.substring(0, 15);
        resultString +=
            `
            <li><a onclick="showProducts('${pnameSubString}'); ">${pnameSubString} ...</a></li>
            `;
    });
    console.log(resultString)
    listNameResult.innerHTML = ''
    listNameResult.innerHTML = resultString
}



// # Load more products
const loadMoreProducts = document.querySelector("#load_more-products");
console.log(loadMoreProducts);
let page = 1;
let perPage = 4;
let checkloading = {
    load: true,
    mess: function() {
        const value = this.load ? "loading" : "load xong";
        return value
    }
}
// console.log(checkload.mess())
loadMoreProducts.addEventListener('click', e => {
    page++;

    checkloading.load = true;
    console.log(checkloading.mess());

    getProductsByPage().then(result => {
        showProductsLoad(result);
        console.log(checkloading.mess());
    })
});
async function getProductsByPage() {
    // Buoc 1:
    const url = `${URL_API}loadmore.php`;
    const data = {
        loadMore: [page, perPage]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });
    
    // Buoc 2:
    const result = await response.json()

    console.log(result)
    checkloading.load = false;
    return result
}

function showProductsLoad(result) {
    const divResult = document.querySelector('#result');
    let count = 0;
    result.forEach(item => {
        if (count == 3) return;
        divResult.innerHTML +=
            `<div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div class="card mt-3">
                    <a href="${URL_PUBLIC_IMG}/product-detail.php/<?php echo $productPath; ?>">
                        <img style="height: 333.4px" src="./public/images/${item.product_photo}" class="card-img-top" alt="...">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title" style="height: 5.5rem;" onclick="getProduct(${item.product_id})">${item.product_name}</h5>
                        <p class="card-text">${item.product_price}</p>
                        <a href="${URL_PUBLIC_IMG}/product-detail.php/<?php echo $productPath; ?>" class="btn btn-primary">Show detail</a>
                    </div>
                </div>
            </div>`;

        count++;
    });
    if (result.length < 4) {
        loadMoreProducts.disabled = true
    }
}