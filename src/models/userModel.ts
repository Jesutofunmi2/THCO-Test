import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  followers: [{ followerId: { type: mongoose.Types.ObjectId, ref: "User" } }],

  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", userSchema);
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getUserById = (id: string) => UserModel.findById({ _id: id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values);
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
