import { axiosInstance } from "../configs/axios";
import { JsonPlaceholderCreate, JsonPlaceholderPartialUpdate, JsonPlaceholderUpdate } from "../models/json_placeholder";

class JsonPlaceholderRepository {

    static async getPosts() {
        const response = await axiosInstance.get('/posts');
        return response.data;
    }

    static async getPostById(postId: number) {
        const response = await axiosInstance.get(`/posts/${postId}`);
        return response.data;
    }

    static async createPost(post: JsonPlaceholderCreate) {
        const response = await axiosInstance.post('/posts', post);
        return response.data;
    }

    static async updatePostById(postId: number, post: JsonPlaceholderUpdate) {
        const response = await axiosInstance.put(`/posts/${postId}`, post);
        return response.data;
    }

    static async patchPostById(postId: number, partialPost: JsonPlaceholderPartialUpdate) {
        const response = await axiosInstance.patch(`/posts/${postId}`, partialPost);
        return response.data;
    }

    static async deletePostById(postId: number) {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        return response.data;
    }
}

export { JsonPlaceholderRepository }
