import express from 'express';
import { filterController } from '../controllers/filterController';
import { validateFilteredResponsesRequest } from '../middleware/filterValidationMiddleware';

const router = express.Router();
/**
 * GET /{formId}/filteredResponses
 * Route for fetching filtered responses for a specific form.
 * Query Parameters:
 * - filters: JSON stringified filters to apply to the responses.
 */
router.get('/:formId/filteredResponses', validateFilteredResponsesRequest, filterController);
export default router;
