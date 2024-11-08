import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';
import { populateDatabase } from '../services/url.service';
import { Url } from '../../../db/entities/url.entity'; // Assuming your URL entity
import { dataSource as AppDataSource } from '../../../db/datasource'; // Assuming your database setup

export async function generateUrls(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		// Initialize the database connection
		const urlRepository = AppDataSource.getRepository(Url);

		// Call the bot function to populate the database with 100 URLs
		populateDatabase(100);
		res.send('Generated successfully');
	} catch (error) {
		LogHelper.error('Unexpected error in createShortUrl', error);
		next(error);
	}
}
