
export interface MySort {
	field: string;
	order: SortOrder;
	[property: string]: any;
}

export enum SortOrder {
	ASC = "asc",
	DESC = "desc"
}