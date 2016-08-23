var controllers = require('./controllers');
var json = require('./controllers/json');
var apartments = require('./controllers/apartments');

module.exports = function (router) {
    router.get('/', controllers.index);
    router.get('/apartments', apartments.search);
    router.get('/apartment_:id.html', apartments.detail);
    router.get('/json', json.associate);

    //router.get('/setSpcl/:type', controllers.setSpcl);
};
