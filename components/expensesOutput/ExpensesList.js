import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData) => {
	return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
	return (
		<FlatList
			data={expenses}
			key={expenses.id}
			renderItem={renderExpenseItem}
		/>
	);
};

export default ExpensesList;

const styles = StyleSheet.create({});
