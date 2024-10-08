"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsHeadlinesRouterV1 = void 0;
const express_1 = require("express");
const news_headlines_1 = require("../../services/news_headlines");
const newsHeadlinesRouterV1 = (0, express_1.Router)();
exports.newsHeadlinesRouterV1 = newsHeadlinesRouterV1;
newsHeadlinesRouterV1.get('/news-headlines', news_headlines_1.viewNewsHeadlines);
newsHeadlinesRouterV1.post('/news-headlines', news_headlines_1.addNewsHeadline);
newsHeadlinesRouterV1.put('/news-headlines/:id', news_headlines_1.editNewsHeadlineById);
newsHeadlinesRouterV1.patch('/news-headlines/:id', news_headlines_1.partialEditNewsHeadlineById); // add logic if data is marked as deleted cant be edited and ask db admin to restore 
newsHeadlinesRouterV1.patch('/news-headlines/:id/deleted', news_headlines_1.softRemoveNewsHeadlineById);
newsHeadlinesRouterV1.delete('/news-headlines/:id', news_headlines_1.removeNewsHeadlinesById);
