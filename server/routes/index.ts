import * as AuthController from "../controllers/auth";
import * as ChatController from "../controllers/chat";
import authMiddleWare from '../middlewares/auth.middleware';
import attachUserMiddleWare from '../middlewares/attach-user.middleware';

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the API!',
	}));

	app.post('/api/auth/login', AuthController.login);
	app.post('/api/auth/register', AuthController.register);
	app.get('/api/auth/validate', authMiddleWare, attachUserMiddleWare, AuthController.validate);
	
	app.get('/api/chat/getLast7Days', ChatController.getLast7Days);
}
