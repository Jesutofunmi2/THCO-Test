import { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/userModel';


export const isOwner = async (req: Request, res: Response, next:NextFunction) => {
   try{
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if(!currentUserId) {
        return res.sendStatus(403);
    }

    if(currentUserId.toString() !== id) {
        return res.sendStatus(403);
    }
        
    next();
   }catch(error){
     console.log(error);
     return res.sendStatus(400);
   }
}

export const isAuthenticated = async (req: Request, res: Response, next:NextFunction) => {
    try{
      const sessionToken = req.cookies['THCO-AUTH'];

      if(!sessionToken) {
        return res.sendStatus(403);
      }

      const existingUser = await getUserBySessionToken(sessionToken);

      if(!existingUser) {
        return res.sendStatus(403);
      }

      merge( req, { identity: existingUser});

      return next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

 export const catchAllMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Resource not found');
    res.status(404).json({ message: 'Resource not found' });
    next(error);
};
