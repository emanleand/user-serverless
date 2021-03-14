/**
 *  
 * @param {String} message 
 * 
 * @@returns This will result in a 400 response code
 */
function createBadRequest(message) {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: message
        })
    };
}

/**
 * 
 * @param {String} message 
 * @returns This will result in a 409 response code
 */
function createConflict(message = 'Conflict') {
    return {
        statusCode: 409,
        body: JSON.stringify({
            message: message
        })
    }
}

/**
 * 
 * @param {String} message 
 * @returns This will result in a 401 response code
 */
 function createUnauthorizer(message = 'Unauthorized') {
    return {
        statusCode: 401,
        body: JSON.stringify({
            message: message
        })
    }
}

/**
 * 
 * @param {Object} data 
 * @returns This will result in a 201 response code
 */
function createCreated(data) {
    return {
        statusCode: 201,
        body: JSON.stringify({
            data
        })
    }
}

/**
 * 
 * @param {Object} data 
 * @returns This will result in a 200 response code
 */
function createOk(data) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            data
        })
    }
}

module.exports = { 
    createBadRequest, 
    createConflict, 
    createCreated,
    createOk,
    createUnauthorizer
}