
/**
 * @author le anh vu
 * @param {API_URL} url 
 * @param {*} method 
 * @param {Object} inputData 
 * @returns Promise
 */
export async function fetchFunction(url, method, inputData) {
  let data = { ...inputData }
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