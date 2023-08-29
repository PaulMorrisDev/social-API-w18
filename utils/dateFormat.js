const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

const dateFormat = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  
  const timeago = (timestamp) => {
    dayjs.extend(relativeTime);
    return dayjs().fromNow(timestamp);
  };
  
  module.exports = { dateFormat, timeago };