"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNewsHeadlinesById = exports.softRemoveNewsHeadlineById = exports.partialEditNewsHeadlineById = exports.editNewsHeadlineById = exports.addNewsHeadline = exports.viewNewsHeadlines = void 0;
const news_headlines_1 = require("../repositories/news_headlines");
const axios_1 = require("axios");
const redis_1 = require("../configs/redis");
const constants_1 = require("../shared/constants");
// Request and Response must be included
const viewNewsHeadlines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedNewsHeadlines = yield redis_1.redis.get(constants_1.SHARED.REDIS.NEWS_HEADLINES_KEY);
        if (cachedNewsHeadlines) {
            res.status(axios_1.HttpStatusCode.Ok).json(JSON.parse(cachedNewsHeadlines));
            return;
        }
        const newsHeadlines = yield news_headlines_1.NewsHeadlinesRepository.getNewsHeadlines();
        yield redis_1.redis.setex(constants_1.SHARED.REDIS.NEWS_HEADLINES_KEY, constants_1.SHARED.REDIS.CACHE_EXPIRY, JSON.stringify(newsHeadlines));
        res.status(axios_1.HttpStatusCode.Ok).json(newsHeadlines);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.viewNewsHeadlines = viewNewsHeadlines;
const addNewsHeadline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, userId } = req.body;
    const data = { title, body, userId };
    if (title === undefined || body === undefined || userId === undefined) {
        res.status(axios_1.HttpStatusCode.BadRequest).json({ message: 'Title, body, and user id are required' });
        return;
    }
    try {
        yield news_headlines_1.NewsHeadlinesRepository.createNewsHeadline(data);
        // Invalidate the cache (delete the 'newsHeadlines' key)
        yield redis_1.redis.del(constants_1.SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(axios_1.HttpStatusCode.Created).json({ message: constants_1.SHARED.MESSAGE.SUCCESS });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.addNewsHeadline = addNewsHeadline;
const editNewsHeadlineById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body } = req.body;
    const data = { title, body };
    if (title === undefined || body === undefined) {
        res.status(axios_1.HttpStatusCode.BadRequest).json({ message: 'Title and body are required' });
        return;
    }
    try {
        yield news_headlines_1.NewsHeadlinesRepository.updateNewsHeadlineById(parseInt(id), data);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(axios_1.HttpStatusCode.Ok).json({ message: constants_1.SHARED.MESSAGE.SUCCESS });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.editNewsHeadlineById = editNewsHeadlineById;
const partialEditNewsHeadlineById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        res.status(axios_1.HttpStatusCode.BadRequest).json({ message: 'No data provided for update.' });
        return;
    }
    const { id } = req.params;
    const { title, body } = req.body;
    const data = { title, body };
    try {
        yield news_headlines_1.NewsHeadlinesRepository.patchNewsHeadlineById(parseInt(id), data);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(axios_1.HttpStatusCode.Ok).json({ message: constants_1.SHARED.MESSAGE.SUCCESS });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.partialEditNewsHeadlineById = partialEditNewsHeadlineById;
const softRemoveNewsHeadlineById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield news_headlines_1.NewsHeadlinesRepository.softDeleteNewsHeadlineById(parseInt(id));
        yield redis_1.redis.del(constants_1.SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(axios_1.HttpStatusCode.Ok).json({ message: constants_1.SHARED.MESSAGE.SUCCESS });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.softRemoveNewsHeadlineById = softRemoveNewsHeadlineById;
const removeNewsHeadlinesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield news_headlines_1.NewsHeadlinesRepository.deleteNewsHeadlineById(parseInt(id));
        yield redis_1.redis.del(constants_1.SHARED.REDIS.NEWS_HEADLINES_KEY);
        res.status(axios_1.HttpStatusCode.Ok).json({ message: constants_1.SHARED.MESSAGE.SUCCESS });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.removeNewsHeadlinesById = removeNewsHeadlinesById;
