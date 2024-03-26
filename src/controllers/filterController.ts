import { getResponses } from '../services/responseService';
import { ResponseFilter } from '../models/ResponseFilter';
import { Request, Response } from 'express';
import { ResponseFiltersType } from '../types/filterResponseTypes';

export const filterController = async (req: Request, res: Response) => {
	const formId = req.params.formId; //Access formId from the route parameter
	let filters: ResponseFiltersType = [];

	try {
		if (req.query.filters) {
			filters = JSON.parse(req.query.filters as string);
			// Get form responses from service
			const responses = await getResponses(formId);
			// Pass responses and filters to filter method
			const filteredResponses = ResponseFilter.filter(responses.responses, filters);
			// Prepare return object
			const result = {
				responses: filteredResponses,
				totalResponses: filteredResponses.length,
				pageCount: Math.ceil(filteredResponses.length / 150),
			}
			// Return filtered responses
			res.json(result);
		} else {
			res.status(400).send('No Filter Data Provided');
		}
	} catch (error) {
		// Handle errors
		res.status(400).send('Invalid request');
	}
};
