const AWS = require('aws-sdk');
const {
    createConflict,
    createOk
} = require('../util/util');

async function getUserEmail(event, context) {
    try {
        const { config } = require(`../../config.${process.env.STAGE_CURRENT}.json`);
        AWS.config.update(config);
        const DocumentClient = new AWS.DynamoDB.DocumentClient();

        const email = event.pathParameters.email;

        const param = {
            TableName: process.env.USER_TABLE,
            IndexName: process.env.USER_TABLE_INDEX_EMAIL,
            KeyConditionExpression: '#keySearch = :email',
            ExpressionAttributeNames: {
                '#keySearch': 'email'
            },
            ExpressionAttributeValues: {
                ':email': email
            }
        }

        const user = await DocumentClient.query(param).promise();

        return createOk(user);
    } catch (err) {
        return createConflict();
    }
}

module.exports = { getUserEmail }