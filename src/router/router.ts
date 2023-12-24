import { OpenAPIRouter } from '@cloudflare/itty-router-openapi'
import { HashtagFetch } from './hashtags';

const router = OpenAPIRouter();

router.get('/api/v1/hashtags', HashtagFetch);

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
