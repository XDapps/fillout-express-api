import { FilterClauseType } from "../types/filterResponseTypes";

export class Filter {
	// Receives Response Object and Filter Object
	static matchesObject(item: Record<string, string | unknown>, filter: FilterClauseType): boolean {
		const keys = Object.keys(item);
		if (keys.length === 0) return false;
		let matchFound = false;
		for (let i = 0; i < keys.length; i++) {
			if (!matchFound) {
				const key = keys[i];
				const itemToCheck = item[key];
				if (Array.isArray(itemToCheck)) {
					matchFound = this._checkArrayObjectsForMatch(itemToCheck, filter);
				}
			};
		}
		return matchFound;
	}
	private static _checkArrayObjectsForMatch(item: Record<string, string | number>[], filter: FilterClauseType): boolean {
		let matchFound = false;
		for (let i = 0; i < item.length; i++) {
			if (!matchFound) {
				matchFound = this._matchesItem(item[i], filter);
			}
		}
		return matchFound;
	}
	private static _matchesItem(item: Record<string, string | number>, filter: FilterClauseType): boolean {
		if (!this._hasRequiredKeys(item)) return false;
		if (item.id !== filter.id) return false;
		if (typeof item.value === "number") {
			return this._checkNumberFilter(item.value as number, filter.value as number, filter.condition);
		} else if (typeof item.value === "string") {
			if (this._isTimestampValue(item.value)) {
				return this._checkTimestampFilter(item.value as string, filter.value as string, filter.condition);
			} else {
				return this._checkStringFilter(item.value as string, filter.value as string, filter.condition);
			}
		}
		return false;
	}
	private static _hasRequiredKeys(itemPasses: Record<string, string | number>): boolean {
		return itemPasses.hasOwnProperty('id') && itemPasses.hasOwnProperty('value');
	}
	private static _checkStringFilter(itemValue: string, filterValue: string, filterOperator: string): boolean {
		switch (filterOperator) {
			case 'equals':
				return itemValue === filterValue;
			case 'does_not_equal':
				return itemValue !== filterValue;
			default:
				return false;
		}
	}
	private static _checkNumberFilter(itemValue: number, filterValue: number, filterOperator: string): boolean {
		switch (filterOperator) {
			case 'equals':
				return itemValue === filterValue;
			case 'does_not_equal':
				return itemValue !== filterValue;
			case 'greater_than':
				return itemValue > filterValue;
			case 'less_than':
				return itemValue < filterValue;
			default:
				return false;
		}
	}
	private static _checkTimestampFilter(itemValue: string, filterValue: string, filterOperator: string): boolean {
		const itemDate = new Date(itemValue);
		const filterDate = new Date(filterValue);
		switch (filterOperator) {
			case 'equals':
				return itemDate.getTime() === filterDate.getTime();
			case 'does_not_equal':
				return itemDate.getTime() !== filterDate.getTime();
			case 'greater_than':
				return itemDate.getTime() > filterDate.getTime();
			case 'less_than':
				return itemDate.getTime() < filterDate.getTime();
			default:
				return false;
		}
	}

	private static _isTimestampValue(value: string): boolean {
		return this._isValidTime(value) || this._isValidDate(value);
	}

	private static _isValidDate(date: string): boolean {
		const dateObj = new Date(date);
		return !isNaN(dateObj.getTime());
	}
	private static _isValidTime(time: string): boolean {
		const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
		return timestampRegex.test(time);
	}

}