import { fetchFunction } from './module_fetchFunction';
import { PUBLIC_IMG_URL, API_URL, BASE_URL } from './module_links';

/**
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

    if (valueFromCookie('check_login') === 'ok') {
      posShow.innerHTML +=
        `
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
                      <svg style="cursor: pointer;" class="bi bi-heart" width="25" height="25" fill="red" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                  </span>
                  <span class="total_like  mx-1">${item.total_like}</span>
                </div>
            </div>
        </div>
      </div>
    `
    } else {
      posShow.innerHTML +=
        `
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
                  <span class="total_like  mx-1">${item.total_like}</span>
                </div>
            </div>
        </div>
      </div>
    `
    }

  });


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

  const hearts = document.querySelectorAll('.heart');
  const user_id = valueFromCookie('id');
  const username = valueFromCookie('username');

  if (valueFromCookie('check_login') === 'ok') {
    hearts.forEach(heart => heart.addEventListener('click', e => {
      const product_id = heart.dataset.pdid;
      fetchFunction(`${API_URL}/update_like_product.php`, `POST`, { product_id: product_id, user_id: user_id, len: 1 })
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result)
        });
    }));
  }


  function setCheckLike() {
    checkLike = !checkLike;

    likeBox.innerHTML = '';
    if (checkLike) {
      likeBox.innerHTML = `
        <svg onclick="setCheckLike()" class="bi bi-heart-fill" style="cursor: pointer;" width="25" height="25" fill="red" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>`
    } else {
      likeBox.innerHTML = `
        <svg  onclick="setCheckLike()" style="cursor: pointer;" class="bi bi-heart" width="25" height="25" fill="red" viewBox="0 0 16 16">
            <path  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg> `;
    }

  }

  // end function show products
}

// load lần đầu tiên
fetchFunction(`${API_URL}/get_product_index_first_load.php`, `POST`, { user_id: 0 })
  .then(response => {
    return response.json();
  })
  .then(result => {
    showProducts(document.querySelector('#result'), result);
  });



/**
 * Toggle products by categories
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
  fetchFunction(`${API_URL}/listproduct_by_categories.php`, `POST`, { checkCategories: checkedCate })
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
  fetchFunction(`${API_URL}/getProductsByName.php`, `POST`, { searchName: searchName })
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
  fetchFunction(`${API_URL}/getProductsByName.php`, `POST`, { searchName: searchName })
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
  fetchFunction(`${API_URL}/getProductsByName.php`, `POST`, { searchName: searchName })
    .then(response => {
      return response.json();
    })
    .then(result => {
      showProducts(document.querySelector('#result'), result);
      listNameResult.innerHTML = '';
    });
}


// load more
// # Load more products
const loadMoreProducts = document.querySelector("#load_more-products");
let page = 1;
let perPage = 4;

loadMoreProducts.addEventListener('click', e => {
  // start loader
  loadMoreProducts.classList.add("button--loading");
  console.log('loading...');
  page++;
  fetchFunction(`${API_URL}/loadmore.php`, `POST`, { loadMore: [page, perPage] })
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