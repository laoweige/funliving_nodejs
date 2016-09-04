var controllers = require('./controllers');
var json = require('./controllers/json');
var apartments = require('./controllers/apartments');
var user = require('./controllers/user');
var schedule = require('./controllers/schedule')

module.exports = function (router) {
    router.get('/', controllers.index);
    router.get('/apartments', apartments.search);
    router.get('/apartment_:id.html', apartments.detail);

    router.get('/json', json.associate);

    router.get('/login', user.login);
    router.get('/signup', user.signup);
    router.post('/login',user.postLogin);

    router.post('/schedule',json.schedule);
    router.get('/apply',schedule.apply);
    router.post('/apply',json.apply);

};
