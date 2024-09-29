import { Router } from 'express';
import { newsHeadlinesRouterV1 } from './v1/news_headlines';
import { jsonPlaceholderRouterV1 } from './v1/json_placeholder';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'

const router = Router();
const SWAGGER_CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const routes = [
    {
        path: '/v1',
        route: newsHeadlinesRouterV1,
    },
    {
        path: '/v1',
        route: jsonPlaceholderRouterV1,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

// API docs
const swaggerRoutes = [
    {
        path: '/',
        route: swaggerUi.serve,
        docs: swaggerUi.setup(swaggerDocument, {
            customCss:
                '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
            customCssUrl: SWAGGER_CSS_URL
        }),
    },
];

if (process.env.APP_DOCS === "enabled") {
    swaggerRoutes.forEach((route) => {
        router.use(route.path, route.route, route.docs);
    });
}

export { router };
