const verify = (req) => {
  if (
    req.cookies.token
  ) {
    return req.cookies.token
  }
  return null;
};

module.exports = verify;