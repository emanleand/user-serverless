const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const Schema = require('../../util/schema');
const {
    createBadRequest,
    createConflict,
    createCreated
} = require('../../util/util');

AWS.config.update({
    endpoint: 'http://localhost:8000',
    region: 'us-west-1',
    accessKeyId: 'fake-access-key',
    secretAccessKey: 'fake-secret-key'
})

async function create(event, context) {
    try {
        const request = JSON.parse(event.body);
        const DocumentClient = new AWS.DynamoDB.DocumentClient();

        /* Validation */
        if (!Schema.validate(request)) {
            return createBadRequest(Schema.getValidationErrors())
        }
        //prepare new user
        let user = {
            id: uuidv4(),
            name: request.name,
            email: request.email,
            username: request.username,
            create_on: Math.floor(new Date().getTime() / 1000.0),
            user_status: 'active'
        };

        await DocumentClient.put({
            TableName: process.env.USER_TABLE,
            Item: user
        }).promise();

        return createCreated(user);
    } catch (err) {
        return createConflict();
    }
}

module.exports = { create }