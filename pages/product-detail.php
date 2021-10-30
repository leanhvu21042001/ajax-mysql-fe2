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
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <div class="row" id="product-detail">
        </div>



        <div class="row">
            <div class="col-md-4">
                <div id="product-rating">
                </div>
                <div id="user-rating">

                </div>
            </div>
            <div class="col-md-8">
                <div>
                    <h3>Comments:</h3>
                    <ul id="list-comments" class="list-group col-12">
                    </ul>
                </div>

                <div id="show_comment">
                </div>
            </div>

        </div>

    </div>
    <!-- <script src="http://localhost/hoc-php-ajax-mysql-front-end-2/pages/js/product_detail.js"></script> -->

    <script>
        // common links
        const API_URL = `http://localhost/hoc-php-ajax-mysql-front-end-2/app/api`;
        const BASE_URL = `http://localhost/hoc-php-ajax-mysql-front-end-2`;
        const PUBLIC_IMG_URL = `http://localhost/hoc-php-ajax-mysql-front-end-2/public/images`;

        // get id product
        const array_value_href = window.location.href.split('-');
        const len = array_value_href.length;
        const product_id = array_value_href[len - 1];

        // get info user
        let user_id = valueFromCookie('id');
        let username = valueFromCookie('username');

        // select elements
        const show_comment = document.querySelector('#show_comment');
        const listComments = document.querySelector('#list-comments');

        // phần rating
        function showAverageRating(product_id) {
            const rating_sao = document.querySelector('#product-rating');


            fetchFunction(`${API_URL}/read_all_rating_product.php`, "POST", {
                    product_id: product_id,
                })
                .then(response => response.json())
                .then((result) => {
                    let average_rating = 0;
                    let isZero = 0;
                    let total = 0;
                    let len = 0;
                    if (result.check === false) {
                        rating_sao.innerHTML = `${average_rating} star`;
                    } else {
                        result.forEach((item, index) => {
                            if (item.len === 0) {
                                isZero++;
                            } else {
                                total += item.len;
                            }
                        });

                        average_rating = total / (result.length - isZero);
                        // if ()
                        if ((average_rating + '') == 'NaN') {
                            rating_sao.innerHTML = `${0} star`;
                        } else {
                            rating_sao.innerHTML = `${average_rating} star`;
                        }
                    }
                });
        }

        function readRatingOfUser(user_id, product_id) {
            fetchFunction(`${API_URL}/read_rating_product.php`, "POST", {
                    user_id: user_id,
                    product_id: product_id,
                }).then(response => response.json())
                .then(result => {
                    if (result.check == false) {
                        updateRating(product_id, user_id, 0);
                        showAverageRating(product_id);
                    } else {
                        const {
                            id,
                            len,
                            user_id,
                            product_id
                        } = result[0];
                        document.querySelector('#user-rating').innerHTML = showRatingForUser(user_id, product_id, len);
                        showAverageRating(product_id);
                    }
                });
        }

        function updateRating(product_id, user_id, len) {
            fetchFunction(`${API_URL}/update_rating_product.php`, "POST", {
                user_id: user_id,
                product_id: product_id,
                len: len,
            }).then(() => {
                document.querySelector('#user-rating').innerHTML = showRatingForUser(user_id, product_id, len);
                showAverageRating(product_id);
            });
        }
        // hiện các ngôi sao user chọn
        function showRatingForUser(user_id, product_id, len = 5) {
            let str = '';
            for (let i = 0; i < 5; i++) {
                if (i < len) {
                    str += ` 
                    <svg width="50" height="50" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path onclick="updateRating(${product_id}, ${user_id}, ${i + 1})" d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>`;
                } else {
                    str += ` 
                    <svg width="50" height="50" fill="black" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path onclick="updateRating(${product_id}, ${user_id}, ${i + 1})" d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>`;
                }
            }
            return str;
        }

        // phần product
        function showDetailProduct(pos, item) {
            pos.innerHTML = `
                <div class="col-md-4">
                    <img class="img-thumbnail" src="${PUBLIC_IMG_URL}/${item.product_photo}" alt="${item.product_name}">
                </div>
                <div class="col-md-8">
                    <h2>${item.product_name}</h2>

                    <p>${item.product_description}</p>
                    <b>Price: ${item.product_price}</b>
                    <br />
                    <b>Views: ${item.product_view}</b>
                </div>
            `;
        }

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

        // hàm dùng nhiều lần
        async function fetchFunction(url, method, inputData) {
            let data = {
                ...inputData
            }
            const response = await fetch(url, {
                method: `${method}`,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data),
            });
            return await response;
        }

        showAverageRating(product_id);
        if (valueFromCookie('check_login') === 'ok') {
            readRatingOfUser(user_id, product_id);
        }
        // Hiện nội dung chi tiết sản phẩm
        fetchFunction(`${API_URL}/product-detail.php`, 'POST', {
                id: product_id
            })
            .then(response => response.json())
            .then(productDetail => {
                showDetailProduct(document.querySelector('#product-detail'), productDetail);
            })

        // hiển thị danh sách comment từ trước
        fetchFunction(`${API_URL}/comment_read.php`, "POST", {
                product_id: product_id
            })
            .then(response => response.json())
            .then(comments => {
                // hiện các comment đã viết từ trước
                comments.forEach(comment => {
                    listComments.innerHTML +=
                        `<li data-userID="${comment.user_id}" class="list-group-item comment-item">
                            <strong>${comment.name}:</strong> ${comment.content} 
                        </li>`
                });
            })
            // sau khi show comment ra và show chi tiết sản phẩm ra.
            .then(function() {
                // trường hợp đã đăng nhập
                if (valueFromCookie('check_login') === 'ok') {
                    // kiểm tra user đã comment chưa
                    let check_comment = false;
                    document.querySelectorAll('.comment-item').forEach((item, i) => {
                        if (item.dataset.userid === user_id) {
                            check_comment = true;
                            return;
                        }
                    });
                    // nếu comment rồi thì không tạo form điền comment
                    if (check_comment == true) {
                        show_comment.innerHTML = '';
                    }
                    // nếu chưa comment thì hiện form ra
                    else {
                        show_comment.innerHTML = `
                            <form class="row g-3" id="form-comment">
                                <div class="col-md-12">
                                    <label for="comment" class="form-label">Content:</label>
                                    <textarea  name="content" id="content_comment" cols="20" rows="2" class="form-control"></textarea>
                                </div>
                                <input type="hidden" id="product_id" value="${product_id}">
                                <div class="col-md-12 mt-3">
                                    <button type="submit" class="btn btn-primary">Comment</button>
                                </div>
                            </form>
                        `;
                        // thuc hien cong viec comment 
                        const formComment = document.querySelector('#form-comment');
                        formComment.addEventListener('submit', (e) => {
                            e.preventDefault();
                            const content_comment = document.querySelector('#content_comment');
                            const comment_data = {
                                user_id: user_id,
                                product_id: product_id,
                                content: content_comment.value,
                            }
                            fetchFunction(`${API_URL}/comment_create.php`, "POST", comment_data)
                                .then(response => response.json())
                                .then(result => {
                                    listComments.innerHTML += `<li class="list-group-item comment-item"><strong>${JSON.parse(result.user)[0].name}:</strong> ${comment_data.content} </li>`
                                });

                            content_comment.value = ''
                            show_comment.innerHTML = '';
                        });
                    }

                    // quyền rating
                }
            });
    </script>
</body>

</html>