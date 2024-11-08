import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LogHelper } from '../../../utils/log-helper';
import { getTop100Urls } from '../services/url.service';
import { Result } from '../../../constants/result';

export async function getTopUrls(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const result = await getTop100Urls();

		// Handle success result
		if (result.type === Result.SUCCESS) {
			res.json(result.data);
		}

		// Handle error result
		if (result.type === Result.ERROR) {
			LogHelper.error(result.message, result.error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'An unexpected error occurred while fetching the top URLs',
				details: result.message,
			});
		}
	} catch (error) {
		// Catch any unexpected errors and forward them to the error handler
		LogHelper.error('Unexpected error while fetching top URLs', error);
		next(error);
	}
}
