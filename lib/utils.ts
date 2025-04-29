export function formatCreateDate(date:string):string{
	const createdAt = new Date(date);
	const year = createdAt.getFullYear();
	const month = String(createdAt.getMonth() + 1).padStart(2, '0');
	const day = String(createdAt.getDate()).padStart(2, '0');

	const formatted = `${year}-${month}-${day}`;

	return formatted;
}