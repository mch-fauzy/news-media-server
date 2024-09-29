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
exports.JsonPlaceholderRepository = void 0;
const axios_1 = require("../configs/axios");
class JsonPlaceholderRepository {
    static getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.axiosInstance.get('/posts');
            return response.data;
        });
    }
    static getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.axiosInstance.get(`/posts/${postId}`);
            return response.data;
        });
    }
    static createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.axiosInstance.post('/posts', post);
            return response.data;
        });
    }
    static updatePostById(postId, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.axiosInstance.put(`/posts/${postId}`, post);
            return response.data;
        });
    }
    static patchPostById(postId, partialPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.axiosInstance.patch(`/posts/${postId}`, partialPost);
            return response.data;
        });
    }
    static deletePostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.axiosInstance.delete(`/posts/${postId}`);
            return response.data;
        });
    }
}
exports.JsonPlaceholderRepository = JsonPlaceholderRepository;
