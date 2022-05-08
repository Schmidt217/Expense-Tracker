import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
	const expensesCtx = useContext(ExpensesContext);
	return (
		<ExpensesOutput
			expensesPeriod="Total"
			expenses={expensesCtx.expenses}
			fallbackText="You have no expenses entered!"
		/>
	);
};

export default AllExpenses;

const styles = StyleSheet.create({});
