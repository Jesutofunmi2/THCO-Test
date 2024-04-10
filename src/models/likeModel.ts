import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

export const LikeModel = mongoose.model("Like", likeSchema);
export const findPostLike = (userId: string, postId: string) => LikeModel.findOne({ userId, postId});
export const createPostLike = (values: Record<string, any>) =>
  new LikeModel(values);