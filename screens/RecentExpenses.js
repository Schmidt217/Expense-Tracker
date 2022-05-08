import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		const getExpenses = async () => {
			try {
				const expenses = await fetchExpenses();
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError("Could not fetch expenses");
			}
			setIsLoading(false);
		};
		getExpenses();
	}, []);

	const errorHandler = () => {
		setError(null);
	};

	if (error && !isLoading) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isLoading) {
		return <LoadingOverlay />;
	}

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expensesPeriod="Last 7 Days"
			expenses={recentExpenses}
			fallbackText="No recent expenses!"
		/>
	);
};

export default RecentExpenses;

const styles = StyleSheet.create({});
