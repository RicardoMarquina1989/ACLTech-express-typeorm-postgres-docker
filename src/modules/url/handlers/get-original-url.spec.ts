/* eslint-disable @typescript-eslint/no-explicit-any */
import { getOriginalUrlHandler } from './get-original-url';
import { getOriginalUrl } from '../services/url.service'; // Import the service
import { StatusCodes } from 'http-status-codes';
import { LogHelper } from '../../../utils/log-helper';

// Mocking dependencies
jest.mock('../services/url.service');
jest.mock('../../../utils/log-helper', () => ({
	LogHelper: {
		error: jest.fn(),
	},
}));

const MOCK_REQUEST: any = {
	params: {
		code: 'abc123',
	},
};

const MOCK_RESPONSE: any = {
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
};

const MOCK_NEXT_FN = jest.fn();

const MOCK_URL = { originalUrl: 'https://example.com' };

describe('getOriginalUrlHandler', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should return the original URL when found', async () => {
		// Mocking the service to return a successful result
		(getOriginalUrl as jest.Mock).mockResolvedValue({
			type: 'SUCCESS',
			data: MOCK_URL,
		});

		// Call the handler
		await getOriginalUrlHandler(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		// Assert the correct status and response
		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith({ originalUrl: MOCK_URL.originalUrl });
		expect(MOCK_NEXT_FN).not.toHaveBeenCalled();
	});

	it('should call next with error if the URL is not found', async () => {
		// Mocking the service to return an error result
		(getOriginalUrl as jest.Mock).mockResolvedValue({
			type: 'ERROR',
			message: 'URL not found',
			error: new Error('URL not found'),
		});

		// Call the handler
		await getOriginalUrlHandler(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		// Assert the error handling
		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith({ error: 'URL not found' });
		expect(MOCK_NEXT_FN).not.toHaveBeenCalled();
	});

	it('should call next if there is an unexpected error', async () => {
		const unexpectedError = new Error('Unexpected error');
		// Mocking the service to throw an unexpected error
		(getOriginalUrl as jest.Mock).mockRejectedValue(unexpectedError);

		// Call the handler
		await getOriginalUrlHandler(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		// Assert next function is called with the error
		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(unexpectedError);
		expect(MOCK_RESPONSE.status).not.toHaveBeenCalled();
		expect(MOCK_RESPONSE.json).not.toHaveBeenCalled();
	});
});
