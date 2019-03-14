var fs = require('fs');

const getHostelsFromLocation = require('../spiders/getHostelsFromLocation');

(async () => {

    const h = await getHostelsFromLocation('Bundoran', 'wtv');

    console.log(h);

})();