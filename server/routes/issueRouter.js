const Router = require('express');
const issueController = require('../controllers/issueController');

const router = new Router();

router.post('/', issueController.create);
router.get('/', issueController.getAll);
router.get('/:id', issueController.getOne);

module.exports = router;
