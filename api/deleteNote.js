const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-south-1'
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.NOTES_TABLE;
const responseUtil = require('../utils/responseHeaders'); 

exports.handler = async event => {

    try {
        return {
            statusCode : 200,
            headers: responseUtil.getResponseHeaders(),
            body: JSON.stringify({})
        }
    }
    catch(err) {
        console.error(err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: responseUtil.getResponseHeaders(),
            body: JSON.stringify({
                message: err.message ? err.message : "Something went wrong."
            }, null, 2)
        };
    }
};
