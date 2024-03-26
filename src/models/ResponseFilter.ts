import { ResponseFiltersType } from "../types/filterResponseTypes";
import { Filter } from "./Filter";

export class ResponseFilter {

	static filter(resultsToFilter: Record<string, unknown>[], filters: ResponseFiltersType): Record<string, unknown>[] {
		const filteredResults: Record<string, unknown>[] = [];
		//Loop all form responses returned from the database
		for (let i = 0; i < resultsToFilter.length; i++) {
			const resultToCheck = resultsToFilter[i] as Record<string, string | number>;
			let matchesAll = true;
			for (let i = 0; i < filters.length; i++) {
				const filter = filters[i];
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

