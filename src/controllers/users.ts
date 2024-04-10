import { Request, Response } from "express";
import { getUsers, deleteUserById, getUserById, updateUserById } from "../models/userModel";


export const getAllUsers = async (req: Request, res: Response) => {
    try{
      const users = await getUsers();

      return res.status(200).json(users)
    }catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
      const { id } = req.params;

      const deleteUser = await deleteUserById(id);

      return res.json(deleteUser)
    }catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
      const { id } = req.params;
      const { username, following } =  req.body;
      
      if(!username) {
        return res.sendStatus(403);
      }

      const user = await getUserById(id);
    
      user.username = username;
      user.followers.push(following);
      
      await user.save();
      return res.status(200).json(user).end();
    }catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}