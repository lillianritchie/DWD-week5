//this collects all variables from your config.js file and loads them here.
require('dotenv').config();

module.exports = {
    // use the defined port, if there is no port defined, use 3000
    PORT: process.env.PORT || 3000,
    //we always need to have this URL defined in our environment variables.
    MONGODB_URI: process.env.MONGODB_URI || ''
}

/*A Uniform Resource Identifier (URI) is a string of characters that 
unambiguously identifies a particular resource. To guarantee uniformity, 
all URIs follow a predefined set of syntax rules, but also maintain 
extensibility through a separately defined hierarchical naming scheme 
(e.g. http:// ).*/