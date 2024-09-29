import { NewsHeadlinesRepository } from '../repositories/news_headlines';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { redis } from '../configs/redis';
import { SHARED } from '../shared/constants';
import { AddRequest, EditRequest, PartialEditRequest } from '../models/news_headlines';

// Request and Response must be included
export const viewNewsHeadlines = async (req: Request, res: Response) => {
    try {
        const cachedNewsHeadlines = await redis.get(SHARED.REDIS.NEWS_HEADLINES_KEY);
        if (cachedNewsHeadlines) {
            res.json(JSON.parse(cachedNewsHeadlines));
            return;
        }

        const newsHeadlines = await NewsHeadlinesRepository.getNewsHeadlines();
        await redis.setex(SHARED.REDIS.NEWS_HEADLINES_KEY, SHARED.REDIS.CACHE_EXPIRY, JSON.stringify(newsHeadlines));
        res.json(newsHeadlines);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const addNewsHeadline = async (req: AddRequest, res: Response) => {
    const { title, body, userId } = req.body;

    try {
        await NewsHeadlinesRepository.createNewsHeadline({ title, body, userId });
        // Invalidate the cache (delete the 'newsHeadlines' key)
        await redis.del(SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(HttpStatusCode.Created).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const editNewsHeadlineById = async (req: EditRequest, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    if (!data.title || !data.body) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'Title and body are required' });
        return
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

export const partialEditNewsHeadlineById = async (req: PartialEditRequest, res: Response) => {
    const { id } = req.params;
    const partialData = req.body;

    if (Object.keys(partialData).length === 0) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'No data provided for update.' });
        return
    }

    try {
        await NewsHeadlinesRepository.patchNewsHeadlineById(parseInt(id), partialData);
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
        res.status(HttpStatusCode.NoContent).json({ message: SHARED.MESSAGE.SUCCESS });
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
        res.status(HttpStatusCode.NoContent).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};
