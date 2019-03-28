const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

const fs = require('fs');

// const getHostelsFromLocation = require('../spiders/getHostelsFromLocation');

(async () => {

    const t = await Promise.all([...new Array(1)].map(async (item) => new Promise(function(resolve, reject) {
        lambda.invoke({
            FunctionName: 'hostelworld-spiders-3-dev-countries',
            Payload: JSON.stringify('test3')
        }, function (err, data) {
            if (err) console.log({err}); // an error occurred
            else console.log(JSON.parse(data.Payload));           // successful response

            resolve(data);
        });
    })));

    console.log(t.length);


    // const h = await getHostelsFromLocation('Bundoran', 'wtv');

    // console.log(h);

})();