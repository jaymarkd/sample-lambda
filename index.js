const axios = require("axios");

const main = async (event) => {
    const webhook = JSON.parse(event['Records'][0].body);
    
    const endpoint = (webhook.endpoint || '').trim();
    const payload = webhook.payload || {};
    const method = (webhook.method || 'POST').trim();
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
    };

    if (endpoint && method) {
        const requestConfig = {
            method: method,
            url: endpoint
        };

        if (headers) {
            requestConfig.headers = headers;
        }
        if (payload) {
            requestConfig.data = payload;
        }

        await axios(requestConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error("Error (Request): ", error);
            });
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };

    return response;
};

exports.handler = main;