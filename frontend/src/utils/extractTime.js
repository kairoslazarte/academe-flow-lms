export function extractTime(dateString) {
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	const date = new Date(dateString);
	const day = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${day} ${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}