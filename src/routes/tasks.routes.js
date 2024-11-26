import{ Router } from 'express';
import tasksController from '../controllers/tasks.controller.js';

const router = Router();

// para proteger las rutas
//import { authenticateToken } from '../middlewares/authenticate.middleware.js';


router.route('/')
.get(tasksController.getTasks)
.post(tasksController.createTask);


router
    .route('/:id')
    .get(tasksController.getTasks)
    .put(tasksController.updateTask)
    .delete(tasksController.deleteTask)
    .patch(tasksController.taskDone);

   /* .get(authenticateToken, tasksController.getTask)
    .put(authenticateToken, tasksController.updateTask)
    .delete(authenticateToken, tasksController.deleteTask)
    .patch(authenticateToken, tasksController.taskDone);*/

export default router;

