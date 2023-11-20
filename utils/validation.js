
function isValidEmail(email) {
  // Regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
}

module.exports = {
  isValidEmail
}