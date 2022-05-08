function minTwoDigits(n) {
	return (n < 10 ? "0" : "") + n;
}

export const getFormattedDate = (date) => {
	return `${minTwoDigits(date.getMonth() + 1)}/${minTwoDigits(
		date.getDate()
	)}/${date.getFullYear()}`;
};

export const getDateMinusDays = (date, days) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
