import { Router } from 'express';
import { createUser, updateUser, deleteUser, loginUser, downgradeUser, upgradeUser } from '../controllers/user.controller';

const UserRouter = Router();

UserRouter.post('/create', createUser);
UserRouter.put('/update', updateUser);
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