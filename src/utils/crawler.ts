import axios from 'axios';

export const fetchPageTitle = async (url: string): Promise<string | null> => {
	try {
		const { data } = await axios.get(url);
		const titleMatch = data.match(/<title>(.*?)<\/title>/);
		return titleMatch ? titleMatch[1] : null;
	} catch (error) {
		console.error(`Failed to fetch title for URL: ${url}`);
		return null;
	}
};
