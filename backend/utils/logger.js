const morgan = require('morgan');

// Morgan logger configuration
const getLogger = () => {
  // In serverless environments (like Vercel), we log to the console.
  // Vercel captures stdout and makes it available in the dashboard logs.
  return morgan('dev');
};

module.exports = getLogger;

