import { Router } from 'express';
import { viewNewsHeadlines, addNewsHeadline, editNewsHeadlineById, partialEditNewsHeadlineById, softRemoveNewsHeadlineById, removeNewsHeadlinesById } from '../../services/news_headlines';

const newsHeadlinesRouterV1 = Router();

newsHeadlinesRouterV1.get('/news-headlines', viewNewsHeadlines);
newsHeadlinesRouterV1.post('/news-headline', addNewsHeadline);
newsHeadlinesRouterV1.put('/news-headline/:id', editNewsHeadlineById);
newsHeadlinesRouterV1.patch('/news-headline/:id', partialEditNewsHeadlineById);
newsHeadlinesRouterV1.delete('/news-headline/:id', softRemoveNewsHeadlineById);
newsHeadlinesRouterV1.delete('/news-headline/hard/:id', removeNewsHeadlinesById);

export { newsHeadlinesRouterV1 };
