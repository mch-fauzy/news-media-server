import { Request, Response } from 'express';
import { JsonPlaceholderRepository } from '../repositories/json_placeholder';
import { HttpStatusCode } from 'axios';
import { SHARED } from '../shared/constants';
import { redis } from '../configs/redis';
import { JsonPlaceholderAddRequest, JsonPlaceholderCreate, JsonPlaceholderEditRequest, JsonPlaceholderPartialEditRequest, JsonPlaceholderPartialUpdate, JsonPlaceholderUpdate } from '../models/json_placeholder';

export const viewAllPosts = async (req: Request, res: Response) => {
    try {
        const cachedPosts = await redis.get(SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        if (cachedPosts) {
            res.status(HttpStatusCode.Ok).json(JSON.parse(cachedPosts));
            return;
        }

        const posts = await JsonPlaceholderRepository.getPosts();
        await redis.setex(SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY, SHARED.REDIS.CACHE_EXPIRY, JSON.stringify(posts));
        res.status(HttpStatusCode.Ok).json(posts);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const viewPostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const cachedPost = await redis.get(SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        if (cachedPost) {
            res.status(HttpStatusCode.Ok).json(JSON.parse(cachedPost));
            return;
        }

        const post = await JsonPlaceholderRepository.getPostById(parseInt(id));
        await redis.setex(SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY, SHARED.REDIS.CACHE_EXPIRY, JSON.stringify(post));
        res.status(HttpStatusCode.Ok).json(post);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const addPost = async (req: JsonPlaceholderAddRequest, res: Response) => {
    const { title, body, userId } = req.body;
    const data: JsonPlaceholderCreate = { title, body, userId }

    if (title === undefined || body === undefined || userId === undefined) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'Title, body, and user id are required' });
        return
    }

    try {
        const newPost = await JsonPlaceholderRepository.createPost(data);
        await redis.del(SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        res.status(HttpStatusCode.Created).json(newPost);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const editPostById = async (req: JsonPlaceholderEditRequest, res: Response) => {
    const { id } = req.params;
    const { title, body, userId } = req.body;
    const data: JsonPlaceholderUpdate = { title, body, userId }

    if (title === undefined || body === undefined || userId === undefined) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'Title, body, and user id are required' });
        return
    }

    try {
        const updatedPost = await JsonPlaceholderRepository.updatePostById(parseInt(id), data);
        await redis.del(SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        await redis.del(SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        res.status(HttpStatusCode.Ok).json(updatedPost);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};

export const partialEditPostById = async (req: JsonPlaceholderPartialEditRequest, res: Response) => {
    if (Object.keys(req.body).length === 0) {
        res.status(HttpStatusCode.BadRequest).json({ message: 'No data provided for update.' });
        return
    }

    const { id } = req.params;
    const { title, body, userId } = req.body;
    const data: JsonPlaceholderPartialUpdate = { title, body, userId }

    try {
        const patchedPost = await JsonPlaceholderRepository.patchPostById(parseInt(id), data);
        await redis.del(SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        await redis.del(SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        res.status(HttpStatusCode.Ok).json(patchedPost);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};


export const removePostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await JsonPlaceholderRepository.deletePostById(parseInt(id));
        await redis.del(SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        await redis.del(SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        res.status(HttpStatusCode.Ok).json({ message: SHARED.MESSAGE.SUCCESS });
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
};
