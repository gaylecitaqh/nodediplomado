import{ Router } from 'express';
import userController from '../controllers/users.controller.js'

// para proteger las rutas
import { authenticateToken } from '../middlewares/authenticate.middleware.js';


const router = Router();
//router.route('/').get(userController.getUsers)
router.route('/').get(userController.getUsers).post(userController.createUser);

//router.route('/:id').get(userController.getUser)
// se encuentra con : http://localhost:3000/api/users/2

//router.route('/:id').get(userController.getUser).put(userController.updateUser);
//se encuentra con: http://localhost:3000/api/users/2  usando PUT

router
    .route('/:id')
    /*.get(userController.getUser)
    .put(userController.updateUser)
    .patch(userController.activateInactivate)
    .delete(userController.deletUser);
*/

// protegiendo las rutas
    .get(authenticateToken, userController.getUser)
    .put(authenticateToken, userController.updateUser)
    .patch(authenticateToken, userController.activateInactivate)
    .delete(authenticateToken, userController.deletUser);

router.get('/:id/tasks', authenticateToken, userController.getTasks); 

export default router;

