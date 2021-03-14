const AWS = require('aws-sdk');
const {
    createConflict,
    createOk
} = require('../util/util');

AWS.config.update({
    endpoint: 'http://localhost:8000',
    region: 'us-west-1',
    accessKeyId: 'fake-access-key',
    secretAccessKey: 'fake-secret-key'
});

async function disable(event, context) {
    try {
        const uuid = event.pathParameters.uuid;

        const DocumentClient = new AWS.DynamoDB.DocumentClient();
        await DocumentClient.update({
            TableName: process.env.USER_TABLE,
            Key: {
                id: uuid
            },
            UpdateExpression: 'set user_status = :status',
            ExpressionAttributeValues: {
                ':status': 'disabled'
            }
        }).promise();

        return createOk({ message: 'success' })
    } catch (err) {
        return createConflict();
    }
}

module.exports = { disable }