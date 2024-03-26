import { celebrate, Joi, Segments } from 'celebrate';

export const validateFilteredResponsesRequest = celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		formId: Joi.string().required(), // Validate the formId parameter
	}),
	[Segments.QUERY]: Joi.object().keys({
		// Validate the filters query parameter
		filters: Joi.string().custom((value, helpers) => {
			try {
				JSON.parse(value);
				return value;
			} catch (error) {
				const message: Joi.LanguageMessages = {
					base: 'Filters must be a valid JSON string',
				}
				helpers.message(message);
			}
		}),
	})
});
