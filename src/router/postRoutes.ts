import express from "express";
import { savePost, getFeed, deletePost, updatePost, getPostByUser } from '../controllers/posts';
import { isAuthenticated, isOwner } from '../middlewares';


export default (router: express.Router) => {
    router.post('/posts/:id', isAuthenticated, isOwner, savePost);
    router.get('/posts/:id', isAuthenticated, getFeed);
    router.get('/post/:id', isAuthenticated, isOwner, getPostByUser);
    router.delete('/posts/:id', isAuthenticated, isOwner, deletePost);
    router.patch('/posts/:id', isAuthenticated, isOwner, updatePost);
}