import { ResponseFiltersType } from "../types/filterResponseTypes";
import { Filter } from "./Filter";

export class ResponseFilter {

	static filter(resultsToFilter: Record<string, unknown>[], filters: ResponseFiltersType): Record<string, unknown>[] {
		const filteredResults: Record<string, unknown>[] = [];
		// Loop all form responses returned from the database
		for (let i = 0; i < resultsToFilter.length; i++) {
			const resultToCheck = resultsToFilter[i] as Record<string, string | number>;
			let matchesAll = true;
			// Loop all filters to check if the response matches all filters
			for (let j = 0; j < filters.length; j++) {
				const filter = filters[j];
				matchesAll = Filter.matchesObject(resultToCheck, filter);
				if (!matchesAll) {
					break;
				}
			}
			if (matchesAll) {
				filteredResults.push(resultToCheck);
			}
		}
		return filteredResults;
	}
}

