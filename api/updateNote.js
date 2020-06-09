const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-south-1'
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const moment = require('moment');

const tableName = process.env.NOTES_TABLE;
const responseUtil = require('../utils/responseHeaders'); 

exports.handler = async event => {
    try {
        let item = (JSON.parse(event.body)).Item;
        item.user_id = requestData.getUserId(event.headers);
        item.user_name = requestData.getUserName(event.headers);
        item.expires = moment().add('90', 'day').unix();
        
        let data =  await dynamoDb.put({
            TableName: tableName,
            Item: item,
            ConditionExpression: '#uid = :uId',
            ExpressionAttributeNames: {
                '#uid' : 'timestamp'
            },
            ExpressionAttributeValues: {
                ':uId' : item.user_id
            }
        }).promise();
        return {
            statusCode : 200,
            headers: responseUtil.getResponseHeaders(),
            body: JSON.stringify(item)
        };
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
