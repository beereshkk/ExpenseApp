import React, { useState } from "react";
import Pagination from "./Pagination";
import "../App.css";
import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";

const AddPagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage, setExpensesPerPage] = useState(2);
  const expenses = useSelector((state) => state.expenses);
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );
  console.log("current expenses", currentExpenses);
  console.log("current page number", currentPage);

  const paginate = (num) => {
    console.log("current page number inside func", num);
    setCurrentPage(num);
  };
  return (
    <div>
      {expenses.length === 0 ? (
        <h2>No expenses found</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Item Name</th>
              <th>Amount</th>
              <th>Expense Date</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.map((expense) => {
              return (
                <tr
                  key={expense._id}
                  style={{
                    textDecoration: expense.isDeleted ? "line-through" : "none",
                  }}
                >
                  <ExpenseItem
                    expense={expense}
                    categories={props.categories}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Pagination
        expensesPerPage={expensesPerPage}
        totalExpenses={expenses.length}
        paginate={paginate}
      />
    </div>
  );
};

// export default AddPagination
