import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export function validateRequest(
  schema: ZodSchema<any>,
  property: 'body' | 'query' | 'params'
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      res.status(400).json({ errors: result.error.format() });
      return;
    }
    
    res.locals.validated = res.locals.validated || {};
    res.locals.validated[property] = result.data;

    next();
  };
}
