const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Basic file logger using morgan
const getLogger = () => {
  // Ensure logs directory exists
  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
  
  // Return morgan middleware
  return morgan('combined', { stream: accessLogStream });
};

module.exports = getLogger;
