import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

export const CommentModel = mongoose.model("Comment", commentSchema);
export const createComment = (values: Record<string, any>) =>
  new CommentModel(values);