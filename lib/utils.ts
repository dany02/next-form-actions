export function formatCreateDate(date:string):string{
	const createdAt = new Date(date);
	const year = createdAt.getFullYear();
	const month = String(createdAt.getMonth() + 1).padStart(2, '0');
	const day = String(createdAt.getDate()).padStart(2, '0');

	const formatted = `${year}-${month}-${day}`;

	return formatted;
}

export function formatToTimeAgo(date:string):string{
	const dayInMs = 1000 * 60 * 60 * 24;
	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const diff = Math.round((time - now) / dayInMs);
	const formatter = new Intl.RelativeTimeFormat("ko");
	return formatter.format(diff, "days");
}