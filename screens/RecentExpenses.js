import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
	const expensesCtx = useContext(ExpensesContext);
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
