import { useLayoutEffect, useContext } from "react";
import { StyleSheet, View, Alert, TextInput } from "react-native";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
	const expensesCtx = useContext(ExpensesContext);

	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	const selectedExpense = expensesCtx.expenses.find(
		(expense) => expense.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	const closeModal = () => {
		navigation.goBack();
	};

	const deleteExpenseHandler = () => {
		Alert.alert(
			"Are you sure you want to delete this expense?",
			"This action cannot be undone!",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{ text: "Delete", onPress: AlertDeleteHandler },
			]
		);
	};

	const AlertDeleteHandler = () => {
		expensesCtx.deleteExpense(editedExpenseId);
		closeModal();
	};

	const cancelHandler = () => {
		closeModal();
	};

	const confirmHandler = (expenseData) => {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			expensesCtx.addExpense(expenseData);
		}
		closeModal();
	};

	return (
		<View style={styles.container}>
			<ExpenseForm
				onCancel={cancelHandler}
				submitButtonLabel={isEditing ? "Update" : "Add"}
				onSubmit={confirmHandler}
				defaultValues={selectedExpense}
			/>

			{isEditing && (
				<View style={styles.delectContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	delectContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});
