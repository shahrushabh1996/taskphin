const NodeCache = require('node-cache');
const myCache = new NodeCache({ deleteOnExpire: true });

function set(key, value, expiry) {
  if (!expiry) return myCache.set(key, value);

  if (_isSecTimestamp(expiry)) return myCache.set(key, value, _convertSecTimestamptoMs(expiry));
  
  return myCache.set(key, value, expiry);
}

function get(key) {
  debugger;
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