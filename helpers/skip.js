const skipPages = (page, limit) => {
  return (page - 1) * limit;
};

module.exports = skipPages;
