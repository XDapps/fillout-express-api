import { celebrate, Joi, Segments } from 'celebrate';

export const validateFilteredResponsesRequest = celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		formId: Joi.string().required(), // Validate the formId parameter
	}),
	[Segments.QUERY]: Joi.object().keys({
		// Validate the filters query parameter
		filters: Joi.string().custom((value, _helpers) => {
			try {
				JSON.parse(value);
				return value;
			} catch (error) {
				throw new Error('Filters must be a valid JSON string');
			}
		}),
	})
});
