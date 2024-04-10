import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
const router = express.Router();

export default (): express.Router => {
  authRoutes(router);
  userRoutes(router);
  postRoutes(router);

  return router;
};
