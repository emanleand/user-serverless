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
        required: true,
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
});