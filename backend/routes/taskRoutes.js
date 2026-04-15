const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

router.use(protect); // All task routes require authentication

router
  .route('/')
  .get(getTasks)
  .post(
    [
      body('title', 'Title is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
      body('status', 'Status is optional but must be valid if provided')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
    ],
    validateRequest,
    createTask
  );

router
  .route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
