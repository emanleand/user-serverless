const AWS = require('aws-sdk');
const {
    createConflict,
    createOk
} = require('../util/util');

async function disable(event, context) {
    try {
        const { config } = require(`../../config.${process.env.STAGE_CURRENT}.json`);
        AWS.config.update(config);

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