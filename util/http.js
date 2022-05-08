import axios from "axios";

const BACKEND_URL = "https://expenses-app-dcba9-default-rtdb.firebaseio.com/";

export const storeExpense = async (expenseData) => {
	const res = await axios.post(BACKEND_URL + "expenses.json", expenseData);
	const id = res.data.name;
	return id;
};
export const fetchExpenses = async () => {
	const res = await axios.get(BACKEND_URL + "expenses.json");
	const expenses = [];
	for (const key in res.data) {
		const expenseObj = {
			id: key,
			amount: res.data[key].amount,
			date: new Date(res.data[key].date),
			description: res.data[key].description,
		};
		expenses.push(expenseObj);
	}

	return expenses;
};

export const updateExpense = (id, expenseData) => {
	return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
	return axios.delete(BACKEND_URL + `expenses/${id}.json`);
};
