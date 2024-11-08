/* eslint-disable @typescript-eslint/no-explicit-any */
import { createShortUrl } from './create-short-url';
import { shortenUrl } from '../services/url.service'; // Import the service
import { StatusCodes } from 'http-status-codes';
import { LogHelper } from '../../../utils/log-helper';
import { clearCacheEntry } from '../../../cache/cache';

// Mocking dependencies
jest.mock('../services/url.service');
jest.mock('../../../cache/cache', () => ({
	clearCacheEntry: jest.fn(),
}));

const MOCK_REQUEST: any = {
	body: {
		originalUrl: 'https://example.com',
	},
};

const MOCK_RESPONSE: any = {
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
};

const MOCK_NEXT_FN = jest.fn();

const MOCK_SHORTENED_URL = { shortCode: 'abc123', originalUrl: 'https://example.com' };

describe('createShortUrl', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('returns an error response if no URL is provided', async () => {
		const badRequest = { ...MOCK_REQUEST, body: {} }; // Missing URL in request body

		await createShortUrl(badRequest, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith({ error: 'URL is required' });
		expect(MOCK_NEXT_FN).not.toHaveBeenCalled();
	});

	it('calls next with error if the shortenUrl service fails', async () => {
		(shortenUrl as jest.Mock).mockResolvedValue({
			type: 'ERROR',
			message: 'Service failed',
			error: new Error('Error'),
		});

		await createShortUrl(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(new Error('Error'));
		expect(MOCK_RESPONSE.status).not.toHaveBeenCalled();
		expect(MOCK_RESPONSE.json).not.toHaveBeenCalled();
	});

	it('successfully shortens a URL and responds with the shortened URL', async () => {
		(shortenUrl as jest.Mock).mockResolvedValue({ type: 'SUCCESS', data: MOCK_SHORTENED_URL });

		await createShortUrl(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(StatusCodes.CREATED);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith(MOCK_SHORTENED_URL);
		expect(clearCacheEntry).toHaveBeenCalledWith(MOCK_REQUEST.baseUrl);
		expect(MOCK_NEXT_FN).not.toHaveBeenCalled();
	});

	it('calls next with unexpected error if there is a server issue', async () => {
		const error = new Error('Unexpected error');
		(shortenUrl as jest.Mock).mockRejectedValue(error);

		await createShortUrl(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(error);
		expect(MOCK_RESPONSE.status).not.toHaveBeenCalled();
		expect(MOCK_RESPONSE.json).not.toHaveBeenCalled();
	});
});
