const AWS = require('aws-sdk');
const {
    createUnauthorizer
} = require('../util/util');

async function app(event, context) {
    const { config } = require(`../../config.${process.env.STAGE_CURRENT}.json`);
    AWS.config.update(config);

    if (!event.authorizationToken) {
        throw createUnauthorizer();
    }

    let authSplit = event.authorizationToken.split(' ');
    if (authSplit[0] !== 'Bearer' || !authSplit[1]) {
        throw createUnauthorizer();
    }

    const DocumentClient = new AWS.DynamoDB.DocumentClient();
    let token = authSplit[1];
    const app = await DocumentClient.query({
        TableName: process.env.APP_TABLE,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'token'
        },
        ExpressionAttributeValues: {
            ':id': token
        }
    }).promise();

    if (app.Count === 0) {
        throw createUnauthorizer();
    }

    return generatePolicy('id123', 'Allow', event.methodArn)
}

/**
 * 
 * @param {String} principalId 
 * @param {String} effect 
 * @param {Object} resource 
 * 
 * @returns {Obejct}
 */
function generatePolicy(principalId, effect, resource) {

    const authResponse = {};
    authResponse.principalId = principalId;

    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}

module.exports = { app }