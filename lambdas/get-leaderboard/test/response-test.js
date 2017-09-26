'use strict';

process.env.STATIC_WEBSITE_URL = 'https://api.example.com';

const response = require('../response');
const chai = require('chai');
const { expect } = chai;


describe('Get Leaderboard Responses', () => {

    it('200 OK', () => {
        const responseBody = {key: 'value'};
        const {statusCode, body} = response.ok(responseBody);

        expect(statusCode).to.eql(200);
        expect(body).to.eql(JSON.stringify(responseBody));
    });


    it('405 METHOD NOT ALLOWED', () => {
        const {statusCode} = response.methodNotAllowed();

        expect(statusCode).to.eql(405);
    });


    it('500 INTERNAL SERVER ERROR', () => {
        const {statusCode} = response.internalServerError();

        expect(statusCode).to.eql(500);
    });


    it('CORS headers', () => {
        const {headers} = response.ok();

        expect(headers).to.eql({
            'Access-Control-Allow-Origin': 'https://api.example.com',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': 86400
        });
    })

});