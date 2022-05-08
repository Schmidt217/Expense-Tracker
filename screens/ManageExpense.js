import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState();

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

	const AlertDeleteHandler = async () => {
		setIsSubmitting(true);
		try {
			expensesCtx.deleteExpense(editedExpenseId);
			await deleteExpense(editedExpenseId);
			closeModal();
		} catch (error) {
			setError("Could not delete expense- please try again later");
		}
		setIsSubmitting(false);
	};

	const cancelHandler = () => {
		closeModal();
	};

	const confirmHandler = async (expenseData) => {
		setIsSubmitting(true);
		try {
			if (isEditing) {
				expensesCtx.updateExpense(editedExpenseId, expenseData);
				await updateExpense(editedExpenseId, expenseData);
			} else {
				const id = await storeExpense(expenseData);
				expensesCtx.addExpense({ ...expenseData, id });
			}
			closeModal();
		} catch (error) {
			setIsSubmitting(false);
			setError("Something went wrong! Please try again!");
		}
	};

	const errorHandler = () => {
		setError(null);
	};

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isSubmitting) {
		return <LoadingOverlay />;
	}

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
