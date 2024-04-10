import express from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import {
  commentOnPost,
  getCommentsCount,
  getLikesCount,
  likePost,
} from "../controllers/interation";

export default (router: express.Router) => {
  router.post("/like/:userId", isAuthenticated, isOwner, likePost);
  router.post("/comment/:userId", isAuthenticated, isOwner, commentOnPost);
  router.get("/likes/count/:postId", isAuthenticated, isOwner, getLikesCount);
  router.get(
    "/comments/count/:postId",
    isAuthenticated,
    isOwner,
    getCommentsCount
  );
};
