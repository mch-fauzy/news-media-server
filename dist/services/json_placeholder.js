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
exports.removePostById = exports.partialEditPostById = exports.editPostById = exports.addPost = exports.viewPostById = exports.viewAllPosts = void 0;
const json_placeholder_1 = require("../repositories/json_placeholder");
const axios_1 = require("axios");
const constants_1 = require("../shared/constants");
const redis_1 = require("../configs/redis");
const viewAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedPosts = yield redis_1.redis.get(constants_1.SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        if (cachedPosts) {
            res.status(axios_1.HttpStatusCode.Ok).json(JSON.parse(cachedPosts));
            return;
        }
        const posts = yield json_placeholder_1.JsonPlaceholderRepository.getPosts();
        yield redis_1.redis.setex(constants_1.SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY, constants_1.SHARED.REDIS.CACHE_EXPIRY, JSON.stringify(posts));
        res.status(axios_1.HttpStatusCode.Ok).json(posts);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.viewAllPosts = viewAllPosts;
const viewPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cachedPost = yield redis_1.redis.get(constants_1.SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        if (cachedPost) {
            res.status(axios_1.HttpStatusCode.Ok).json(JSON.parse(cachedPost));
            return;
        }
        const post = yield json_placeholder_1.JsonPlaceholderRepository.getPostById(parseInt(id));
        yield redis_1.redis.setex(constants_1.SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY, constants_1.SHARED.REDIS.CACHE_EXPIRY, JSON.stringify(post));
        res.status(axios_1.HttpStatusCode.Ok).json(post);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.viewPostById = viewPostById;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, userId } = req.body;
    const data = { title, body, userId };
    if (title === undefined || body === undefined || userId === undefined) {
        res.status(axios_1.HttpStatusCode.BadRequest).json({ message: 'Title, body, and user id are required' });
        return;
    }
    try {
        const newPost = yield json_placeholder_1.JsonPlaceholderRepository.createPost(data);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        res.status(axios_1.HttpStatusCode.Created).json(newPost);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.addPost = addPost;
const editPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body, userId } = req.body;
    const data = { title, body, userId };
    if (title === undefined || body === undefined || userId === undefined) {
        res.status(axios_1.HttpStatusCode.BadRequest).json({ message: 'Title, body, and user id are required' });
        return;
    }
    try {
        const updatedPost = yield json_placeholder_1.JsonPlaceholderRepository.updatePostById(parseInt(id), data);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        res.status(axios_1.HttpStatusCode.Ok).json(updatedPost);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.editPostById = editPostById;
const partialEditPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        res.status(axios_1.HttpStatusCode.BadRequest).json({ message: 'No data provided for update.' });
        return;
    }
    const { id } = req.params;
    const { title, body, userId } = req.body;
    const data = { title, body, userId };
    try {
        const patchedPost = yield json_placeholder_1.JsonPlaceholderRepository.patchPostById(parseInt(id), data);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        res.status(axios_1.HttpStatusCode.Ok).json(patchedPost);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.partialEditPostById = partialEditPostById;
const removePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield json_placeholder_1.JsonPlaceholderRepository.deletePostById(parseInt(id));
        yield redis_1.redis.del(constants_1.SHARED.REDIS.EXT_JSON_PLACEHOLDER_KEY);
        yield redis_1.redis.del(constants_1.SHARED.REDIS.EXT_SINGLE_JSON_PLACEHOLDER_KEY);
        res.status(axios_1.HttpStatusCode.Ok).json({ message: constants_1.SHARED.MESSAGE.SUCCESS });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(axios_1.HttpStatusCode.InternalServerError).json({ message: error.message });
        }
    }
});
exports.removePostById = removePostById;
