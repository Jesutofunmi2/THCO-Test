import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  media: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const PostModel = mongoose.model("Post", postSchema);
export const getPostByUserId = (id: string) => PostModel.find({ user: id });
export const getPostById = (id: string) => PostModel.findById(id);
export const createPost = (values: Record<string, any>) =>
  new PostModel(values);
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
export const updatePostLikeById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
