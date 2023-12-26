import { OpenAPIRouter } from '@cloudflare/itty-router-openapi'
import { HashtagCreate, HashtagFetch } from './hashtags';
import { UserCreate, UserFetch } from './users';

const router = OpenAPIRouter();

router.get('/api/v1/hashtags', HashtagFetch);
router.post('/api/v1/hashtags', HashtagCreate);

router.get('/api/v1/users/:userId', UserFetch);
router.post('/api/v1/users', UserCreate);

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
