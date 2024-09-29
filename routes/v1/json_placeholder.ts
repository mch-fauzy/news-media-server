import { Router } from 'express';
import { viewAllPosts, viewPostById, addPost, editPostById, partialEditPostById, removePostById } from '../../services/json_placeholder';

const jsonPlaceholderRouterV1 = Router();

jsonPlaceholderRouterV1.get('/posts', viewAllPosts);
jsonPlaceholderRouterV1.get('/posts/:id', viewPostById);
jsonPlaceholderRouterV1.post('/posts', addPost);
jsonPlaceholderRouterV1.put('/posts/:id', editPostById);
jsonPlaceholderRouterV1.patch('/posts/:id', partialEditPostById);
jsonPlaceholderRouterV1.delete('/posts/:id', removePostById);

export { jsonPlaceholderRouterV1 };
