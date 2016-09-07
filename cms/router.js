var controllers = require('./controllers');
var apartmentController = require('./controllers/apartment');
var scheduleController = require('./controllers/schedule');

module.exports = function (router) {
    router.get('/', controllers.index);
    router.post('/', controllers.login);
    router.get('/apartment/add', apartmentController.add);
    router.post('/apartment/add', apartmentController.postAdd);

    router.get('/apartment/room', apartmentController.room);
    router.post('/apartment/room', apartmentController.postRoom);
    router.post('/apartment/upload', apartmentController.upload);

    router.get('/apartment/list', apartmentController.list);

    router.get('/schedule/list', scheduleController.schedules);
    router.get('/schedule/applies', scheduleController.applies);


};