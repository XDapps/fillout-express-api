import axios from 'axios';

const API_BASE_URL = 'https://api.fillout.com/v1/api/forms';

export const getResponses = async (formId: string) => {
	try {
		const url = `${API_BASE_URL}/${formId}/submissions`;
		const response = await axios.get(url, {
			headers: {
				'Authorization': `Bearer ${process.env.API_KEY}`
			}
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching form data:', error);
		throw new Error('Failed to fetch form data');
	}
};
