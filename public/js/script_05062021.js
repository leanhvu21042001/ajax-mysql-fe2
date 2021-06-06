import { fetchFunction } from './module_fetchFunction';
import { PUBLIC_IMG_URL, API_URL, BASE_URL } from './module_links';

/** Show products
 * @author le anh vu
 * @param {Position selected} posShow 
 * @param {Object} value 
 */
function showProducts(posShow, value, len = 999, isAdd = false) {
    let count = 0;
    if (!isAdd) {
        posShow.innerHTML = '';
    }

    value.forEach(item => {
        if (count == len) {
            return;
        }
        count++;
        // đăng nhập rồi thì hiện trái tim rỗng lên, chưa thì  hiện mỗi số lượng tim thôi
        if (valueFromCookie('check_login') === 'ok') {
            posShow.innerHTML += `
              <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                  <div class="card mt-3">
                      <a href="${BASE_URL}/pages/product-detail.php/id-${item.id}">
                          <img style="height: 333.4px" src="${PUBLIC_IMG_URL}/${item.product_photo}" class="card-img-top img-fluid" alt="...">
                      </a>
                      <div class="card-body">
                          <h5 class="card-title" style="height: 5.5rem;" onclick="getProduct(${item.id})">${item.product_name}</h5>
                          <p class="card-text">${item.product_price}</p>
                      </div>
                      <div class="card-footer text-center">
                          <a href="${BASE_URL}/pages/product-detail.php/id-${item.id}" class="btn btn-primary">Show detail</a>
                          <a href="${BASE_URL}/pages/update-product.php?id=${item.id}" class="btn btn-primary">Update product</a>

                          <div class="like-box">
                          <span class="heart product-${item.id}" data-pdid="${item.id}">
                              <svg class="bi bi-heart" style="cursor: pointer;"  width="25" height="25" fill="red" viewBox="0 0 16 16">
                                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                              </svg>
                          </span>
                          <span class="total_like-${item.id}  mx-1">${item.total_like}</span>
                          </div>
                      </div>
                  </div>
              </div>
              `
        } else {
            posShow.innerHTML += `
            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="card mt-3">
                    <a href="${BASE_URL}/pages/product-detail.php/id-${item.id}">
                        <img style="height: 333.4px" src="${PUBLIC_IMG_URL}/${item.product_photo}" class="card-img-top img-fluid" alt="...">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title" style="height: 5.5rem;" onclick="getProduct(${item.id})">${item.product_name}</h5>
                        <p class="card-text">${item.product_price}</p>
                    </div>
                    <div class="card-footer text-center">
                        <a href="${BASE_URL}/pages/product-detail.php/id-${item.id}" class="btn btn-primary">Show detail</a>
                        <a href="${BASE_URL}/pages/update-product.php?id=${item.id}" class="btn btn-primary">Update product</a>

                        <div class="like-box">
                            <svg onclick="return alert('Đăng nhập để like!')" class="bi bi-heart-fill" style="cursor: pointer;" width="25" height="25" fill="red" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                            <span class="total_like-${item.id}  mx-1">${item.total_like}</span>
                        </div>
                    </div>
                </div>
            </div>
              `
        }
    });

    // có đăng nhập thì lấy tất cả các trái tim ra
    const hearts = document.querySelectorAll('.heart');
    const user_id = valueFromCookie('id');
    const username = valueFromCookie('username');

    // console.log('Có đăng nhập thì thực hiện chức năng phụ bên dưới');
    hearts.forEach(heart => {
        const product_id = heart.dataset.pdid;
        // cứ mỗi lần duyệt qua tim, thì kiểm tra user này có like cái sản phẩm này chưa. 
        // có thì hiện ra tim đỏ, không thì tim rỗng
        fetchFunction(`${API_URL}/read_one_like_of_user.php`, `POST`, {
            product_id: product_id,
            user_id: user_id,
            len: 1
        })
            .then(response => response.json())
            .then(result => {
                // nếu đăng nhập và like rồi thì làm tim thành màu đỏ
                if (result.check === true && result.read.len === 1) {
                    heart.innerHTML = '';
                    heart.classList.add('heart-fill-red');
                    // heart.classList.remove('heart-fill-none');
                    heart.innerHTML = `
                          <svg class="bi bi-heart-fill" style="cursor: pointer;" width="25" height="25" fill="red" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                          </svg>`;
                } else {
                    heart.classList.add('heart-fill-none');
                    // sự kiện like cho thằng nào chưa liked
                    heart.addEventListener('click', e => {
                        if (heart.classList[2].indexOf('heart-fill-red')) {
                            // update bảng like trước
                            fetchFunction(`${API_URL}/update_like_product.php`, `POST`, {
                                product_id: product_id,
                                user_id: user_id,
                                len: 1
                            })
                                .then(response => response.json())
                                .then(item => {
                                    // update total_like cho product
                                    fetchFunction(`${API_URL}/update_total_like_for_product.php`, `POST`, {
                                        product_id: product_id,
                                    })
                                        .then(response => response.json())
                                        .then((result) => {
                                            const total_like = document.querySelector(`.total_like-${product_id}`);
                                            total_like.innerHTML = "";
                                            total_like.innerHTML = result.total_like + 1;
                                            // console.log('p057_gftth_thanhnc27')
                                            heart.classList.add('heart-fill-red');
                                            heart.classList.remove('heart-fill-none');
                                            // remove event click
                                            heart.innerHTML = `
                                      <svg class="bi bi-heart-fill" style="cursor: pointer;" width="25" height="25" fill="red" viewBox="0 0 16 16">
                                          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                      </svg>`
                                        });
                                });
                        }


                        heart.classList.remove('heart-fill-none');
                        heart.classList.add('heart-fill-red');
                    });
                }

            });
    });
    // lấy giá trị từ cookie
    function valueFromCookie(name) {
        let value = null;
        value = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${name}=`));
        if (value === undefined) {
            return '';
        }
        return value.split('=')[1];
    }
    // end function show products
}

// load lần đầu tiên
fetchFunction(`${API_URL}/get_product_index_first_load.php`, `POST`, {
    user_id: 0
}).then(response => {
    return response.json();
}).then(result => {
    showProducts(document.querySelector('#result'), result);
});

/** Toggle products by categories
 * 
 */
const categoriesCheckbox = document.querySelectorAll('input[name="categories"]');
let checkedCate = [];
categoriesCheckbox.forEach(checkbox => checkbox.addEventListener('change', function () {
    if (this.checked) {
        checkedCate.push(this.value);
    } else {
        const valueIndex = checkedCate.indexOf(this.value);
        if (valueIndex !== -1) {
            checkedCate.splice(valueIndex, 1);
        }
    }

    if (checkedCate.length < 1) checkedCate = [1];
    fetchFunction(`${API_URL}/listproduct_by_categories.php`, `POST`, {
        checkCategories: checkedCate
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            showProducts(document.querySelector('#result'), result);
        });

}));

// Search products
const inputSearchChange = document.querySelector('#inputSearchChange');
const submitSearch = document.querySelector('#submitSearch');
const listNameResult = document.querySelector(".list_names-result");
// show  name of list  products
inputSearchChange.addEventListener('focusin', e => {
    let searchName = e.target.value
    fetchFunction(`${API_URL}/getProductsByName.php`, `POST`, {
        searchName: searchName
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            showListKeywords(result);
        });
});
inputSearchChange.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        return;
    }
    let searchName = e.target.value
    fetchFunction(`${API_URL}/getProductsByName.php`, `POST`, {
        searchName: searchName
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            showListKeywords(result);
        });
});
function showListKeywords(result) {
    let resultString = ``;
    result.forEach(item => {
        var pnameSubString = item.product_name.substring(0, 15);
        resultString +=
            `
      <li><a onclick="submitFormToShow('${pnameSubString}'); ">${pnameSubString} ...</a></li>
    `;
    });
    listNameResult.innerHTML = ''
    listNameResult.innerHTML = resultString
}

// show products on submit form search
submitSearch.addEventListener('submit', e => {
    e.preventDefault();
    let searchName = inputSearchChange.value
    submitFormToShow(searchName);

});

function submitFormToShow(searchName) {
    fetchFunction(`${API_URL}/getProductsByName.php`, `POST`, {
        searchName: searchName
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            showProducts(document.querySelector('#result'), result);
            listNameResult.innerHTML = '';
        });
}

// # Load more products
const loadMoreProducts = document.querySelector("#load_more-products");
let page = 1;
let perPage = 4;

loadMoreProducts.addEventListener('click', e => {
    // start loader
    loadMoreProducts.classList.add("button--loading");
    console.log('loading...');
    page++;
    fetchFunction(`${API_URL}/loadmore.php`, `POST`, {
        loadMore: [page, perPage]
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            showProducts(document.querySelector('#result'), result, 3, true);
            if (result.length < 4) {
                loadMoreProducts.disabled = true;
            }
            console.log('loaded');
            // end loader
            loadMoreProducts.classList.remove("button--loading");
        });

});