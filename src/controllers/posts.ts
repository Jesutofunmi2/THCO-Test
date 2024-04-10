import { Request, Response } from "express";

import { createPost, deletePostById, getPostById, getPostByUserId } from "../models/postModel";
import { getUserById } from "../models/userModel";

export const savePost = async (req: Request, res: Response) => {
    try {
        const { text, media } = req.body;
        
        const { id }  = req.params; // Assuming authenticated user's ID is available in request

        // Create the post
        const post = createPost({
            text,
            media,
            user:id,
        })

        // Save the post to the database
        await post.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFeed = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Assuming authenticated user's ID is available in request
        const { page = 1, limit = 10 } = req.query; // Default page to 1 and limit to 10 if not provided

        // Find the user to get their followed users
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get IDs of users followed by the authenticated user
        const followedUsers = user.followers;
        console.log(followedUsers[0]._id);

        // Calculate skip value for pagination
        const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

       // Retrieve posts from followed users (sorted by newest first) with pagination
        // const feed = await getPostByUserId(followedUsers[0]._id)
        //                        .populate('username'); // Populate user field with username

        // res.json({ feed });
    } catch (error) {
        console.error('Error getting feed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try{
      const { id } = req.params;

      const deletePost = await deletePostById(id);

      return res.json(deletePost)
    }catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try{
      const { id } = req.params;
      const { text, media } =  req.body;

      const post = await getPostById(id);
      console.log(post);
       if(!post) {
        return res.sendStatus(404).json({message : 'Post not found'});
       }
       

      post.text = text;
      post.media = media;
      await post.save();

      return res.status(200).json(post).end();
    }catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}

export const getPostByUser = async (req: Request, res: Response) => {
    try{
      const { id } = req.params;

      const post = await getPostByUserId(id);
       if(!post) {
        return res.sendStatus(404).json({message : 'Post not found'});
       }
       

      return res.status(200).json(post).end();
    }catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}