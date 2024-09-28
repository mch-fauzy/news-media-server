"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const news_headlines_1 = require("./v1/news_headlines");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const router = (0, express_1.Router)();
exports.router = router;
const SWAGGER_CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.3/swagger-ui.css";
const v1Routes = [
    {
        path: '/v1',
        route: news_headlines_1.newsHeadlinesRouterV1,
    },
];
v1Routes.forEach((route) => {
    router.use(route.path, route.route);
});
// API docs
const swaggerRoutes = [
    {
        path: '/',
        route: swagger_ui_express_1.default.serve,
        docs: swagger_ui_express_1.default.setup(swagger_json_1.default, { customCssUrl: SWAGGER_CSS_URL }),
    },
];
if (process.env.APP_DOCS === "enabled") {
    swaggerRoutes.forEach((route) => {
        router.use(route.path, route.route, route.docs);
    });
}
