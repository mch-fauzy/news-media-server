import { Router } from 'express';
import { viewNewsHeadlines, addNewsHeadline, editNewsHeadlineById, partialEditNewsHeadlineById, softRemoveNewsHeadlineById, removeNewsHeadlinesById } from '../../services/news_headlines';

const newsHeadlinesRouterV1 = Router();

newsHeadlinesRouterV1.get('/news-headlines', viewNewsHeadlines);
newsHeadlinesRouterV1.post('/news-headlines', addNewsHeadline);
newsHeadlinesRouterV1.put('/news-headlines/:id', editNewsHeadlineById);
newsHeadlinesRouterV1.patch('/news-headlines/:id', partialEditNewsHeadlineById);
newsHeadlinesRouterV1.delete('/news-headlines/:id', softRemoveNewsHeadlineById);
newsHeadlinesRouterV1.delete('/news-headlines/hard/:id', removeNewsHeadlinesById);

export { newsHeadlinesRouterV1 };
