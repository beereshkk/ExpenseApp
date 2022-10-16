import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpenseItem from "./ExpenseItem";

const ExpenseTable = React.memo((props) => {
  const { searchText } = props;
  const storePageNum = useSelector((state) => state.pageNum);
  console.log("state page Num", storePageNum);
  const expenses = useSelector((state) => state.expenses);
  const deletedExpenses = useSelector((state) => state.deletedExpenses);
  const categories = useSelector((state) => state.categories);
  const allExpenses = [...expenses, ...deletedExpenses].sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  const findCategory = (id) => {
    const res = categories.find((category) => category._id === id);
    return res.name;
  };
  const [expensesPerPage, setExpensesPerPage] = useState(5);
  const indexOfLastExpense = expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = allExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );
  console.log("current expenses", currentExpenses);

  const finalArr = (
    searchText.length > 0 ? allExpenses : currentExpenses
  ).filter((expense) => {
    if (searchText === "") {
      return expense;
    } else if (
      expense.name.toLowerCase().includes(searchText.toLowerCase()) ||
      findCategory(expense.categoryId)
        .toLowerCase()
        .includes(searchText.toLowerCase())
    ) {
      return expense;
    }
  });

  return (
    <div>
      {finalArr.length === 0 ? (
        <h2>
          {searchText
            ? "No expenses found"
            : "No expenses found. Add your first!"}
        </h2>
      ) : (
        <>
          <h3>
            Total Expenses -{" "}
            {(searchText.length > 0 ? finalArr : allExpenses).length}
          </h3>
          <table striped="columns">
            <thead>
              <tr>
                <th>Category</th>
                <th>Item Name</th>
                <th>Amount</th>
                <th>Expense Date</th>
              </tr>
            </thead>
            <tbody>
              {finalArr.map((expense) => {
                return (
                  <tr
                    key={expense._id}
                    style={{
                      textDecoration: expense.isDeleted
                        ? "line-through"
                        : "none",
                    }}
                    className={expense.isDeleted && "table-active"}
                  >
                    <ExpenseItem expense={expense} categories={categories} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
});

export default React.memo(ExpenseTable);
