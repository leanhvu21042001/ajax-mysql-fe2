
async function getProduct(productId) {
  const url = "http://localhost/hoc-php-ajax-mysql-front-end-2/app/api/productdetail.php";
  const data = {
      id: productId
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

  // tao chuc nang show
  var myModal = new bootstrap.Modal(document.getElementById('productModal'));
  myModal.show();

  // noi dung hien thi
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  modalTitle.innerHTML = `${result.product_name}`;
  modalBody.innerHTML = `${result.product_description}`;
}