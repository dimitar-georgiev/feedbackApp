/**
 * Created by Mitaka on 17-Oct-17.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}