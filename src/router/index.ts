import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import interationRoutes from "./interationRoutes";
const router = express.Router();

export default (): express.Router => {
  authRoutes(router);
  userRoutes(router);
  postRoutes(router);
  interationRoutes(router);
  return router;
};
