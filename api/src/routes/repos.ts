import { Router, Request, Response } from 'express';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  try{
    let data = await (await axios.get('https://api.github.com/users/silverorange/repos')).data;
    res.json(data);
  }catch(error){
    if(error instanceof Error){
      console.log(error.message)
    }
  }
});
