const AWS = require('aws-sdk');
const {
    createConflict,
    createOk
} = require('../util/util');

async function remove(event, context) {
    try {
        const { config } = require(`../../config.${process.env.STAGE_CURRENT}.json`);
        AWS.config.update(config);

        const uuid = event.pathParameters.uuid;

        const DocumentClient = new AWS.DynamoDB.DocumentClient();
        await DocumentClient.delete({
            TableName: process.env.USER_TABLE,
            Key: {
                id: uuid
            }
        }).promise();

        return createOk({ message: 'Delete ok' });
    } catch (err) {
        return createConflict();
    }
}

module.exports = { remove }