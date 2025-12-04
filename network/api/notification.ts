import { MySort } from "../entity/MySort"
import { PageableContent } from "../entity/pageable";
import { Notification } from "../entity/notification";
import { fetchNoError } from "../request";

export async function getPageableNotifications(
	page: number = 0, 
	size: number = 10, 
	sort?: MySort
): Promise<PageableContent<Notification> | undefined> {
	const res = await fetchNoError<PageableContent<Notification>>({
		method: "GET",
		url: "/notifications",
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})
	
	return res?.result?.data;
}

export async function getUnreadNum(): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: "/notification/unread-count"
	})
	
	return res?.result?.data;
}

export async function markNotificationReaded(
	notificationId: number
): Promise<Notification | undefined> {
	const res = await fetchNoError<Notification>({
		method: "PATCH",
		url: `/notifications/${notificationId}/read`
	})
	
	return res?.result?.data;
}

export async function markAllNotificationReaded(): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "PATCH",
		url: `/notifications/read-all`
	})
	
	return res?.result?.data;
}
