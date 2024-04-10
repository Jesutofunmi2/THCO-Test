import { Request, Response } from "express";

import {
  createPost,
  deletePostById,
  getPostByUserId,
} from "../models/postModel";
import { getUserById } from "../models/userModel";

export const savePost = async (req: Request, res: Response) => {
  try {
    const { text, media } = req.body;

    const { id } = req.params;

    const post = createPost({
      text,
      media,
      user: id,
    });

    // Save the post to the database
    await post.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followedUsers = user.followers;

    const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const feed = await getPostByUserId(followedUsers[0].id).populate(
      "username"
    );

    res.json({ feed });
  } catch (error) {
    console.error("Error getting feed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletePost = await deletePostById(id);

    return res.json(deletePost);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getPostByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await getPostByUserId(id);
    if (!post) {
      return res.sendStatus(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
