import { Router } from 'express';
import { createUser, updateUser, deleteUser, loginUser, downgradeUser, upgradeUser, getAllUsers, isAdmin } from '../controllers/user.controller';
import { User } from '../models/Users';

const UserRouter = Router();

UserRouter.get('/isAdmin/:CI', isAdmin);
UserRouter.get('/:pageSize/:page', getAllUsers);
UserRouter.post('/create', createUser);
UserRouter.put('/update/:CI', updateUser);
UserRouter.delete('/delete/:CI', deleteUser);
UserRouter.post('/login', loginUser);
UserRouter.post('/downgrade/:CI', downgradeUser);
UserRouter.post('/upgrade/:CI', upgradeUser);
UserRouter.get('/health', async (_, res) => {
    res.status(200).json({
        message: 'User service is healthy',
        timestamp: new Date().toISOString()
    });
}); 

export default UserRouter;