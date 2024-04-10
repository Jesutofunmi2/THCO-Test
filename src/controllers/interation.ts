import { Request, Response } from "express";
import { createPostLike, findPostLike } from "../models/likeModel";
import { getPostById, updatePostLikeById } from "../models/postModel";
import { createComment } from "../models/commentModel";

export const likePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    const { userId } = req.params;

    const existingLike = await findPostLike(userId, postId);
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "User has already liked this post" });
    }

    const createNewlike = createPostLike({ userId, postId });
    await createNewlike.save();

    await updatePostLikeById(postId, { $inc: { likesCount: 1 } });

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  try {
    const { postId, text } = req.body;
    const { userId } = req.params;

    const newComment = createComment({ userId, postId, text });
    await newComment.save();

    await updatePostLikeById(postId, { $inc: { commentsCount: 1 } });

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error commenting on post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLikesCount = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ likesCount: post.likesCount });
  } catch (error) {
    console.error("Error getting likes count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsCount = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ commentsCount: post.commentsCount });
  } catch (error) {
    console.error("Error getting comments count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
