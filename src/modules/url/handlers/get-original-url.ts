import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LogHelper } from '../../../utils/log-helper';
import { getOriginalUrl } from '../services/url.service';
import { Result } from '../../../constants/result';

export async function getOriginalUrlHandler(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { code } = req.params; // Extract the short code from the request params
		const result = await getOriginalUrl(code); // Call the service to get the original URL

		// If an error occurred while fetching the original URL
		if (result.type === Result.ERROR) {
			LogHelper.error(result.message, result.error);
			res.status(StatusCodes.NOT_FOUND).json({ error: 'URL not found' });
			return; // Return to prevent further code execution
		}

		// If the result is successful, send back the original URL
		if (result.type === Result.SUCCESS) {
			// Respond with the original URL
			res.json({ originalUrl: result.data.originalUrl });
			return; // Return after successful response
		}

		// Fallback: if no matching result type
		res.status(StatusCodes.NOT_FOUND).json({ error: 'URL not found' });
	} catch (error) {
		// Catch any unexpected errors
		LogHelper.error('Unexpected error while fetching original URL', error);
		next(error);
	}
}
