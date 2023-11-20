const NodeCache = require('node-cache');
const myCache = new NodeCache({ deleteOnExpire: true });

function set(key, value, expiry) {
  if (!expiry) return myCache.set(key, value);

  if (_isSecTimestamp(expiry)) return myCache.set(key, value, _convertSecTimestamptoMs(expiry));
  return myCache.set(key, value, expiry);
}

function get(key) {
  return myCache.get(key);
}

function _getTTL(futureTimestamp, currentTimestamp) {
  if (futureTimestamp <= currentTimestamp) return 0;

  return Math.floor(futureTimestamp - currentTimestamp);
}

function _isSecTimestamp(timestamp) {
  const length = String(timestamp).length;

  if (length === 10) return true; 
  else if (length === 13) return false;
  return null;
}

function _convertSecTimestamptoMs(timestamp) {
  return timestamp * 1000;
}

module.exports = {
  set,
  get
};

// (async () => {
//   // console.log(getTTL(1700224125, Math.floor(Date.now() / 1000)));
//   console.log(set("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUnVzaGFiaCBTaGFoIiwiaWF0IjoxNzAwMjIwOTE4LCJleHAiOjE3MDAyMjQ1MTh9.9BZHFNa0Vu5zffqiRrwnu6XiKDvk_z757PIF_wG8-R1", 0, Date.now() + 5000))
//   console.log(get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUnVzaGFiaCBTaGFoIiwiaWF0IjoxNzAwMjIwOTE4LCJleHAiOjE3MDAyMjQ1MTh9.9BZHFNa0Vu5zffqiRrwnu6XiKDvk_z757PIF_wG8-R1"))

//   setTimeout(() => {
//     console.log(get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUnVzaGFiaCBTaGFoIiwiaWF0IjoxNzAwMjIwOTE4LCJleHAiOjE3MDAyMjQ1MTh9.9BZHFNa0Vu5zffqiRrwnu6XiKDvk_z757PIF_wG8-R1"))
//   }, 6000)
// })()