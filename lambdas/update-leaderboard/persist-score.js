'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION
});

const SCORE_TABLE = process.env.SCORE_TABLE;

function persistScore(scores) {
    const promises = Object.keys(scores)
        .map(playerId => {
            return {
                TableName: SCORE_TABLE,
                Key: {
                    playerId: playerId
                },
                UpdateExpression: "ADD score :score",
                ExpressionAttributeValues: {
                    ":score": scores[playerId]
                }
            }
        })
        .forEach(params => documentClient
            .update(params)
            .promise()
        );
    return Promise.all(promises);
}

module.exports = persistScore;