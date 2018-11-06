const mongoose = require('mongoose');
const dbConfig = require('../config/database.config.js');
var log = require('../utils/log')(module);
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    // console.log("Successfully connected to the database");
    log.debug("Successfully connected to the database");
}).catch(err => {
    // console.log('Could not connect to the database. Exiting now...', err);
    log.debug(`Could not connect to the database. Exiting now... ${err}`);
    process.exit();
});

module.exports = mongoose;