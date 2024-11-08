/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTopUrls } from './get-top-urls';
import { getTop100Urls } from '../services/url.service'; // Import the service
import { StatusCodes } from 'http-status-codes';
import { LogHelper } from '../../../utils/log-helper';

// Mocking dependencies
jest.mock('../services/url.service');
jest.mock('../../../utils/log-helper', () => ({
	LogHelper: {
		error: jest.fn(),
	},
}));

const MOCK_REQUEST: any = {};
const MOCK_RESPONSE: any = {
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
};
const MOCK_NEXT_FN = jest.fn();

const MOCK_TOP_URLS = [
	{ originalUrl: 'https://example1.com', shortUrl: 'abc123' },
	{ originalUrl: 'https://example2.com', shortUrl: 'xyz789' },
];

describe('getTopUrls', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should return the top URLs successfully', async () => {
		// Mocking the service to return a successful result
		(getTop100Urls as jest.Mock).mockResolvedValue({
			type: 'SUCCESS',
			data: MOCK_TOP_URLS,
		});

		// Call the handler
		await getTopUrls(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		// Assert the correct status and response
		expect(MOCK_RESPONSE.status).not.toHaveBeenCalled();
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith(MOCK_TOP_URLS);
		expect(MOCK_NEXT_FN).not.toHaveBeenCalled();
	});

	it('should return an error response if the service returns an error', async () => {
		// Mocking the service to return an error result
		(getTop100Urls as jest.Mock).mockResolvedValue({
			type: 'ERROR',
			message: 'Failed to fetch top URLs',
			error: new Error('Service error'),
		});

		// Call the handler
		await getTopUrls(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		// Assert the error handling
		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith({
			error: 'An unexpected error occurred while fetching the top URLs',
			details: 'Failed to fetch top URLs',
		});
		expect(MOCK_NEXT_FN).not.toHaveBeenCalled();
	});

	it('should call next if there is an unexpected error', async () => {
		const unexpectedError = new Error('Unexpected error');
		// Mocking the service to throw an unexpected error
		(getTop100Urls as jest.Mock).mockRejectedValue(unexpectedError);

		// Call the handler
		await getTopUrls(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		// Assert next function is called with the error
		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(unexpectedError);
		expect(MOCK_RESPONSE.status).not.toHaveBeenCalled();
		expect(MOCK_RESPONSE.json).not.toHaveBeenCalled();
	});
});
