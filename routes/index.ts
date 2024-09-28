import { Router } from 'express';
import { newsHeadlinesRouterV1 } from './v1/news_headlines';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'

const router = Router();
const SWAGGER_CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const v1Routes = [
    {
        path: '/v1',
        route: newsHeadlinesRouterV1,
    },
];

v1Routes.forEach((route) => {
    router.use(route.path, route.route);
});

// API docs
const swaggerRoutes = [
    {
        path: '/',
        route: swaggerUi.serve,
        docs: swaggerUi.setup(swaggerDocument, { customCssUrl: SWAGGER_CSS_URL }),
    },
];

if (process.env.APP_DOCS === "enabled") {
    swaggerRoutes.forEach((route) => {
        router.use(route.path, route.route, route.docs);
    });
}

export { router };
