import { NewsHeadlinesRepository } from '../repositories/news_headlines';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { redis } from '../configs/redis';
import { SHARED } from '../shared/constants';
import { NewsHeadlineAddRequest, NewsHeadlineCreate, NewsHeadlineEditRequest, NewsHeadlinePartialEditRequest, NewsHeadlinePartialUpdate, NewsHeadlineUpdate } from '../models/news_headlines';

// Request and Response must be included
export const viewNewsHeadlines = async (req: Request, res: Response) => {
    try {
        const cachedNewsHeadlines = await redis.get(SHARED.REDIS.NEWS_HEADLINES_KEY);
        if (cachedNewsHeadlines) {
            res.status(HttpStatusCode.Ok).json(JSON.parse(cachedNewsHeadlines));
            return;
        }

        const newsHeadlines = await NewsHeadlinesRepository.getNewsHeadlines();
        await redis.setex(SHARED.REDIS.NEWS_HEADLINES_KEY, SHARED.REDIS.CACHE_EXPIRY, JSON.stringify(newsHeadlines));
        res.status(HttpStatusCode.Ok).json(newsHeadlines);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const addNewsHeadline = async (req: NewsHeadlineAddRequest, res: Response) => {
    const { title, body, userId } = req.body;
    const data: NewsHeadlineCreate = { title, body, userId }

    if (title === undefined || body === undefined || userId === undefined) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'Title, body, and user id are required' });
        return
    }

    try {
        await NewsHeadlinesRepository.createNewsHeadline(data);
        // Invalidate the cache (delete the 'newsHeadlines' key)
        await redis.del(SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(HttpStatusCode.Created).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const editNewsHeadlineById = async (req: NewsHeadlineEditRequest, res: Response) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const data: NewsHeadlineUpdate = { title, body };

    if (title === undefined || body === undefined) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'Title and body are required' });
        return;
    }

    try {
        await NewsHeadlinesRepository.updateNewsHeadlineById(parseInt(id), data);
        await redis.del(SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(HttpStatusCode.Ok).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const partialEditNewsHeadlineById = async (req: NewsHeadlinePartialEditRequest, res: Response) => {
    if (Object.keys(req.body).length === 0) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'No data provided for update.' });
        return
    }

    const { id } = req.params;
    const { title, body } = req.body;
    const data: NewsHeadlinePartialUpdate = { title, body }

    try {
        await NewsHeadlinesRepository.patchNewsHeadlineById(parseInt(id), data);
        await redis.del(SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(HttpStatusCode.Ok).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const softRemoveNewsHeadlineById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await NewsHeadlinesRepository.softDeleteNewsHeadlineById(parseInt(id));
        await redis.del(SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(HttpStatusCode.Ok).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const removeNewsHeadlinesById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await NewsHeadlinesRepository.deleteNewsHeadlineById(parseInt(id));
        await redis.del(SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(HttpStatusCode.Ok).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};
