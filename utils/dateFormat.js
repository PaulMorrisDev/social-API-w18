const dayjs = require('dayjs');

const dateFormat = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

module.exports = dateFormat;