import { MySort } from "../entity/MySort";
import { PageableContent } from "../entity/pageable";
import { ReportContent, ReportInfo, ReportResult } from "../entity/report";
import { fetchNoError } from "../request";

export async function commitReport(content: ReportContent): Promise<ReportInfo | undefined> {
	const res = await fetchNoError<ReportInfo>({
		method: "POST",
		url: "/reports",
		data: content
	})
	
	return res?.result?.data;
}

export async function getReportRecord(
	page: number = 0, 
	size: number = 10, 
	sort?: MySort
): Promise<PageableContent<ReportInfo> | undefined> {
	const res = await fetchNoError<PageableContent<ReportInfo>>({
		method: "GET",
		url: "reports",
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})
	
	return res?.result?.data;
}

export async function getReportInfo(
	reportId: number
): Promise<ReportInfo | undefined> {
	const res = await fetchNoError<ReportInfo>({
		method: "GET",
		url: `/reports/${reportId}`
	})
	
	return res?.result?.data;
}

export async function postReportResult(
	reportId: number,
	result: ReportResult
): Promise<ReportInfo | undefined> {
	const res = await fetchNoError<ReportInfo>({
		method: "PATCH",
		url: `/reports/${reportId}/result`
	})
	
	return res?.result?.data;
}