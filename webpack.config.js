const path = require('path');
module.exports = {
    entry: __dirname + '\\src\\main.js',
    output: {
        path: __dirname + "\\public\\js",
        filename: 'main.js'
    }
}