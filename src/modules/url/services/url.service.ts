// src/services/url.service.ts

import axios from 'axios';
import { Repository, InsertResult } from 'typeorm';
import { Url } from '../../../db/entities/url.entity';
import { dataSource as AppDataSource } from '../../../db/datasource';
import { fetchPageTitle } from '../../../utils/crawler';
import { bijectiveEncode, bijectiveDecode } from '../../../utils/bijective';
import { Result } from '../../../constants/result';
import { SuccessResult, ErrorResult, NotFoundResult } from '../../../interfaces/results';

export type CreateUrlResult = SuccessResult<{ id: Url['id']; shortCode: string }> | ErrorResult;
export type GetUrlResult = SuccessResult<Url> | NotFoundResult | ErrorResult;
export type TopUrlsResult = SuccessResult<Url[]> | ErrorResult;

const urlRepository: Repository<Url> = AppDataSource.getRepository(Url);

/**
 * Shorten a URL or return existing one
 */
export async function shortenUrl(originalUrl: string): Promise<CreateUrlResult> {
	try {
		const existingUrl = await urlRepository.findOne({ where: { originalUrl } });
		if (existingUrl) {
			return {
				type: Result.SUCCESS,
				data: { id: existingUrl.id, shortCode: existingUrl.shortCode },
			};
		}

		const shortCode = generateShortCode();
		const title = await fetchPageTitle(originalUrl);

		const newUrl = urlRepository.create({ originalUrl, shortCode, title });
		const savedUrl = await urlRepository.save(newUrl);

		return {
			type: Result.SUCCESS,
			data: { id: savedUrl.id, shortCode: savedUrl.shortCode },
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while shortening the URL.`,
			error,
		};
	}
}

/**
 * Retrieve original URL by shortCode
 */
export async function getOriginalUrl(shortCode: string): Promise<GetUrlResult> {
	try {
		const url = await urlRepository.findOne({ where: { shortCode } });

		if (!url) {
			return {
				type: Result.NOT_FOUND,
				message: `URL with short code ${shortCode} not found.`,
			};
		}

		// Increment click count if URL is found
		url.clickCount += 1;
		await urlRepository.save(url);

		return {
			type: Result.SUCCESS,
			data: url,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An error occurred while retrieving the URL for short code ${shortCode}.`,
			error,
		};
	}
}

/**
 * Get top 100 most clicked URLs
 */
export async function getTop100Urls(): Promise<TopUrlsResult> {
	try {
		const urls = await urlRepository.find({
			order: { clickCount: 'DESC' },
			take: 100,
		});
		return {
			type: Result.SUCCESS,
			data: urls,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An error occurred while fetching the top URLs.`,
			error,
		};
	}
}

/**
 * Generate a random short code
 */
function generateShortCode(): string {
	return bijectiveEncode(Date.now());
}
