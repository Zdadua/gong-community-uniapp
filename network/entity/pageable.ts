
export interface PageableContent<T> {
	content?: T[];
	pageable?: Pageable;
	totalElements?: number;
	totalPages?: number;
	size?: number;
	number?: number;
	sort?: Sort;
	numberOfElements?: number;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
	[property: string]: any;
}

export interface Pageable {
	sort?: Sort;
	pageNumber?: number;
	pageSize?: number;
	offset?: number;
	paged?: boolean;
	unpaged?: boolean;
	[property: string]: any;
}

export interface Sort {
	sorted?: boolean;
	unsorted?: boolean;
	empty?: boolean;
	[property: string]: any;
}