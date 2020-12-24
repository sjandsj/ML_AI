/* global fetch:true  */

const requestTimeout = 1000 * 60;
const requestTimeoutMessage = 'Request timeout';

function timeoutPromise(promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(requestTimeoutMessage));
    }, requestTimeout);
    promise.then(
      (response) => {
        clearTimeout(timeoutId);
        resolve(response);
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}

export const api = (url, method, headers, body) => {
  console.log(`url: ${url} \nmethod: ${method}\nheaders: ${headers}\nbody: ${body}`);
  const object = { method, headers };
  if (body) {
    object.body = body;
  }
  return (
    timeoutPromise(fetch(url, object))
      .then(response => response)
      .catch(error => error)
  );
};

