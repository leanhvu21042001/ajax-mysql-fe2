
// # khởi tạo biến, hằng. Sự khác biệt giữa: let, const, var
var x = 3
let y = 4
const Z = 5
// sự khác nhau
var x = 100 // không bị lỗi, vì dùng var để tạo biến, có thể tạo lại biến có tên y hệt vẫn không lỗi
// let y = 100 // chạy sẽ báo lỗi ngay. const cũng tương tự let chỉ khác việc, không thể gán giá trị cho const. còn let có thể gán giá trị

// # kiểu dữ liệu.
// kiểu số, chuổi, boolean | undefined, null | Array, Object
let iNum = 0
let str = "LAV"
let check = false

let und = undefined
let nil = null

//let arr = new Array(); let arrw2 = [1, 2, "3", 4]
let arr = new Array(new Array()); let arrw2 = [1, 2, "3", 4][1, 2, "3", 4]
let obj = new Object(); let objw2 = { id: 0, name: "leanhvu", age: "20" }

// # toán tử: +, -, *, /, %, ++, --

// # Hàm, cách tạo hàm, hàm arrow 

// hàm bình thường ai cũng hiểu
function sum2num(a, b) { return a + b }
const sum2num_v2 = function (a, b) { return a + b }
// hàm arrow
const sum2num_v3 = (a, b) => { return a + b }
const sum2num_v4 = (a, b) => (a + b)

// # phép so sánh.
// !== và === , so sánh luôn cả kiểu dữ liệu, khuyên dùng này.
// != và == , so sánh mỗi giá trị không so sánh kiểu dữ liệu

// câu điều kiện: if else, if else if else, switch case 

// # Vòng lặp:
let arrayForLoop = ["chanh", "chuoi", "buoi", "xoai"]
// while (...) {... }, do {... } while (...), for (...;...;...) {... }

// for (... of ...) {...}, for (... in ...) {...}
for (const value of arrayForLoop) {
  console.log(value) // value sẽ là giá trị phần tử mảng.
}
for (const index in arrayForLoop) {
  console.log(index) // index sẽ là vị trí của giá trị
  console.log(arrayForLoop[index]) // in ra giá trị thì phải làm thế này.
}


// # một số hàm chức năng (methods) cần chú ý.
let arrayForMethods = [1, 2, 3, 4, 5];


// lấy mảng nối các phần tử và ký tự khác
console.log(arrayForMethods.join('')) //sẽ cho ra chuỗi: 12345
console.log(arrayForMethods.join('') === "12345") // sẽ bằng true
console.log(arrayForMethods.join('-')) //sẽ cho ra chuỗi: 1-2-3-4-5

// array.map: trả về mảng mới. có hàm truyền vào, và hàm truyền vào lại có đối số, đối số chính là giá trị của mảng.
let resultMap = arrayForMethods.map(function (item) {
  return item + 1;
}); // resultMap = [2, 3, 4, 5, 6]

var rectangles = [{ width: 2, height: 5 }, { width: 1, height: 5 }, { width: 3, height: 5 }];
var resultRectangles = rectangles.map(function (item) {
  return item.width * item.height;
}); // đáp án? => {viết ra đây !}


// array.filter: kiểm tra nếu item % 2 là true thì cho vào mảng, và trả về mảng khi thự hiện xong.
let resultFilter = arrayForMethods.filter(function (item) {
  return item % 2 === 0;
}); // resultFilter = [2, 4]


// array.find: làm như filter nhưng dừng lại khi gặp true đầu tiên. trả về 1 phần tử.
var resultFind = arr.find(function (item) {
  return item % 2 === 0;
}); // resultFind = [2]

// array.sort
/** 
 * if return < 0 >>> a will come before b
 * if return > 0 >>> a will come after b
 * if return = 0 >>> a and b will stay unchanged
 * */
 var numbers = [2, 9, 3, 4, 1];
 var newArrayNumbers = numbers.sort(function(a, b) {
   return b - a;
 }); // newArrayNumbers = [ 9, 4, 3, 2, 1 ]



 // ## một lưu ý khi dùng vòng lặp hoặc methods lặp. ## //
 // có thể thấy, vòng lặp như: for(..in..){..}, for(..ò..){..}, for(..){..} chúng ta có thể dùng break
 // còn .forEach, .map, .filter, .find .... ; thì không thể break, mà phải là return vì những thằng này là HÀM.


 // # buộc đọc thêm, đọc lại. Theo thứ tự links dưới:
 // https://www.w3schools.com/js/js_es5.asp
 // https://www.w3schools.com/js/js_es6.asp



//  version 2

// # ES2015
/**
 * let const
 * arrow functions
 * classes
 * default parameters
 * template literals
 * destructuring assignments
 * enhanced object literals
 * modules
 * new string methods
 * new object methods
 * the spread operator
 * set map
 * generators
 * 
 */

// # ES2016

/**
 * array.prototype.inclues()
 * Exponentiation Operator {Math.pow(4, 2) == 4 ** 2}
 * 
 */



/**
general_log_file = C:\wamp64\www\backend2-tdc-hoctrenlop\my-mysql-logs\logs\query.log				
general_log = 1	
		
slow_query_log = 1				
slow-query_log_file = C:\wamp64\www\backend2-tdc-hoctrenlop\my-mysql-logs\logs\mysql-slow.log				
long_query_time = 2
 */