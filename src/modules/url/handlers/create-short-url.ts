import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';
import { shortenUrl } from '../services/url.service';

export async function createShortUrl(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { originalUrl } = req.body;
		console.log('originalUrl => ', originalUrl);
		if (!originalUrl) {
			res.status(StatusCodes.BAD_REQUEST).json({ error: 'URL is required' });
		}

		// Call the shortenUrl service function
		const result = await shortenUrl(originalUrl);

		// Handle error from the service
		if (result.type === Result.ERROR) {
			LogHelper.error(result.message, result.error);
			return next(result.error);
		}

		// Clear the cache entry for this URL endpoint (if necessary)
		clearCacheEntry(req.baseUrl);

		// Send the response with the shortened URL data
		res.status(StatusCodes.CREATED).json(result.data);
	} catch (error) {
		LogHelper.error('Unexpected error in createShortUrl', error);
		next(error);
	}
}
