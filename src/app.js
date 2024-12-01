// aquí va el express

// para que las importaciones funcionen en package.json incluir "type": "module"
import express from 'express';
import { authenticateToken } from './middlewares/authenticate.middleware.js';
 import morgan from 'morgan';
//RUTAS
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // PARA EL POST

//RUTAS
app.use('/api/login', authRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/tasks',authenticateToken,tasksRoutes);

export default app;