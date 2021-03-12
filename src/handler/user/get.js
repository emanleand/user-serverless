const AWS = require('aws-sdk');
const {
    createConflict,
    createOk
} = require('../../util/util');

AWS.config.update({
    endpoint: 'http://localhost:8000',
    region: 'us-west-1',
    accessKeyId: 'fake-access-key',
    secretAccessKey: 'fake-secret-key'
});

async function get(event, context) {
    try {
        const uuid = event.pathParameters.uuid;

        const DocumentClient = new AWS.DynamoDB.DocumentClient();
        const item = await DocumentClient.query({
            TableName: process.env.USER_TABLE,
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeNames: {
                '#id': 'id'
            },
            ExpressionAttributeValues: {
                ':id': uuid
            }
        }).promise();

        return createOk(item);
    } catch (err) {
        return createConflict();
    }
}

module.exports = { get }