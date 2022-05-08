import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		description: "A pair of shoes",
		amount: 59.99,
		date: new Date("2022-05-07"),
	},
	{
		id: "e2",
		description: "A pair of pants",
		amount: 79.99,
		date: new Date("2022-05-05"),
	},
	{
		id: "e3",
		description: "bananas",
		amount: 5.99,
		date: new Date("2022-04-07"),
	},
	{
		id: "e4",
		description: "book",
		amount: 19.99,
		date: new Date("2022-01-07"),
	},
	{
		id: "e5",
		description: "Macbook Pro",
		amount: 2999.99,
		date: new Date("2022-05-06"),
	},
	{
		id: "e6",
		description: "A pair of shoes",
		amount: 59.99,
		date: new Date("2022-05-07"),
	},
	{
		id: "e7",
		description: "A pair of pants",
		amount: 79.99,
		date: new Date("2022-05-05"),
	},
	{
		id: "e8",
		description: "bananas",
		amount: 5.99,
		date: new Date("2022-04-07"),
	},
	{
		id: "e9",
		description: "book",
		amount: 19.99,
		date: new Date("2022-01-07"),
	},
	{
		id: "e10",
		description: "Macbook Pro",
		amount: 2999.99,
		date: new Date("2022-05-06"),
	},
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	deleteExpense: (id) => {},
	updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const id = new Date().toString() + Math.random().toString();
			return [{ ...action.payload, id }, ...state];
		case "UPDATE":
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);
			const updatableExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;
		case "DELETE":
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
};

const ExpensesContextProvider = ({ children }) => {
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

	const addExpense = (expenseData) => {
		dispatch({ type: "ADD", payload: expenseData });
	};

	const deleteExpense = (id) => {
		dispatch({ type: "DELETE", payload: id });
	};

	const updateExpense = (id, expenseData) => {
		dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
	};

	const value = {
		expenses: expensesState,
		addExpense,
		deleteExpense,
		updateExpense,
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
};

export default ExpensesContextProvider;
