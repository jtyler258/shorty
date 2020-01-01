import { Request, Response } from 'express';

const get = {
  path: '/health',
  method: 'get',
  handler: async (_req: Request, res: Response) => {
    res.send("success");
  }

}
export default [
  get
]