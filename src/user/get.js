const AWS = require('aws-sdk');
const {
    createConflict,
    createOk
} = require('../util/util');

async function get(event, context) {
    try {
        const { config } = require(`../../config.${process.env.STAGE_CURRENT}.json`);
        AWS.config.update(config);

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