const Schemy = require('schemy');

module.exports = new Schemy({
    'name': {
        type: String,
        required: true
    },
    'surname': {
        type: String,
        required: true
    },
    'username': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    }
});