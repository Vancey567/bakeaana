const router = require('express').Router();

const workshopController = require('./controller/workshop-controller');
const userController = require('./controller/user-controller');
const homeController = require('./controller/home-controller');

// Middlewares
const verifyTokenMiddleware = require('./middlewares/token-middleware');
const admin = require('./middlewares/admin-middleware');

router.get('/', homeController().home);
router.get('/login', userController().getloginPage);
router.post('/login', userController().login);
router.get('/register', userController().getregisterPage);
router.post('/register', userController().register);
router.get('/workshop', workshopController().showWorkshop);
router.get('/workshop', homeController().home);
router.post('/workshop', verifyTokenMiddleware, admin, workshopController().createWorkshop);
// router.post('/workshop/register', workshopController().register);
router.get('/attendees',  verifyTokenMiddleware, admin, workshopController().attendees);
router.post('/attendees', verifyTokenMiddleware, workshopController().registerAttendee);

module.exports = router;