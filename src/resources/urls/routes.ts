import { Request, Response } from 'express';
import ShortId from 'shortid';
import Redis from '../../db/redis';
import { Item } from 'common/types';
import { buildUrl, sanitizeUrl } from '../../utils';

const post = {
  path: '/urls',
  method: 'post',
  handler: async (req: Request, res: Response) => {
    const item: Item = req.body;
    if (!item.url) {
      res.status(400).json("JSON body must contain url");
      return;
    }

    item.id = ShortId.generate();
    item.url = sanitizeUrl(item.url);

    if (!item.url) {
      res.status(400).json("Url was not valid");
      return;
    }

    try {
      await Redis.set(item.id, item.url);  
    } catch (err) {
      res.status(500).json({ message: err })
      return;
    }
    
    res.status(201).json({ ...item, id: buildUrl(item.id) });
    return;
  }
}

const getSingle = {
  path: '/:id',
  method: 'get',
  handler: async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(404).send();
      return;
    }

    const url = await Redis.get(req.params.id);
    if (!url) {
      res.status(404).send();
      return;
    }

    res.redirect(url.toString());
    return;
  }
}
export default [
  post,
  getSingle
]