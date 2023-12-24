import { Env } from '../worker-configuration';
import apiRouter from './router/router';
import { D1StorageService } from './services/storage/d1.service';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {		
		env.STORAGE_SERVICE = new D1StorageService(env);
		return apiRouter.handle(request, env, ctx);
	},
};