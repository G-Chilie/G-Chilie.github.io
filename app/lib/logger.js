const winston = require('winston');
const fs = require('fs');

/**
 * Function responsible for formatting the log lines.
 * @param entry the log entry to format
 * @returns {string} the log line that will be passed to the transports
 */
const formatter = (entry) => {
  const date = new Date(entry.timestamp()).toISOString();

  let message = '';
  if ((entry.message !== undefined)) {
    ({ message } = entry.message);
  }

  let context = '';
  if (entry.meta && Object.keys(entry.meta).length) {
    context = JSON.stringify(entry.meta);
  }

  return `${date} ${entry.level.toUpperCase()} ${message} ${context}`;
}

/**
 * Generates the timestamp used by the log entries.
 * @returns {number} the timestamp
 */
function generateTimestamp() {
  return Date.now();
}

/**
 * Creates transports based on config values
 * @returns {array} the created transports
 */
function createTransports(config) {
  const transports = [];

  // setup the file transport
  if (config.file) {
    // create the file
    fs.open(config.file, 'w', (err, fd) => {
      if (err) {
        throw new Error(`Unable to create log file at ${config.file}`);
      }

      fs.chmod(config.file, '755');
      fs.close(fd);
    });

    // setup the log transport
    transports.push(
      new winston.transports.File({
        filename: config.file,
        json: false,
        timestamp: generateTimestamp,
        formatter,
        level: config.level,
      }),
    );
  }

  // setup the console transport, because devs don't always want to tail the log file.
  // if config.console is set to true, a console logger will be included.
  if (config.console) {
    transports.push(
      new winston.transports.Console({
        timestamp: generateTimestamp,
        formatter,
        level: config.level,
      }),
    );
  }

  return transports;
}

module.exports = winston.createLogger({
  transports: createTransports({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  }),
});
