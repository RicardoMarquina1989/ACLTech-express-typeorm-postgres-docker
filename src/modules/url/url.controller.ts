import { Router } from 'express';
import { createShortUrl } from './handlers/create-short-url';
import { generateUrls } from './handlers/generate-url';
import { getOriginalUrlHandler } from './handlers/get-original-url';
import { getTopUrls } from './handlers/get-top-urls';

const urlRouter = Router();

urlRouter.get('/top-100', getTopUrls);
urlRouter.get('/:code', getOriginalUrlHandler);
urlRouter.post('/shorten', createShortUrl);
urlRouter.post('/generate', generateUrls);

export const UrlController = { router: urlRouter };
