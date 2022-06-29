import { Router, Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.status(200);
  
  let data: any[] = [];
  
  //Grab repo data
  try{
    data = [
      ...data, 
      JSON.parse(fs.readFileSync('./data/repos.json').toString()), //Local File
      await (await axios.get('https://api.github.com/users/silverorange/repos')).data //Directly from Github
    ];   
    res.json(data);
  }catch(error){
    if(error instanceof Error){
      console.log(error.message)
    }
  }
});
