import { OpenAPIRouter } from '@cloudflare/itty-router-openapi'
import { CategoryCreate, CategoryFetch } from './categories';
import { UserCreate, UserFetch } from './users';
import { ExpenseCreate, ExpenseFetch } from './expenses';

const router = OpenAPIRouter();

router.get('/api/v1/categories', CategoryFetch);
router.post('/api/v1/categories', CategoryCreate);

router.get('/api/v1/users/:userId', UserFetch);
router.post('/api/v1/users', UserCreate);

router.get('/api/v1/expenses', ExpenseFetch);
router.post('/api/v1/expenses', ExpenseCreate);

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
