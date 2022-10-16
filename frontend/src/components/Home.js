import React, { useState } from "react";
import "../App.css";
import AddExpense from "./AddExpense";
import BudgetOverview from "./BudgetOverview";
import ExpenseTable from "./ExpenseTable";
import SearchBar from "./SearchBar";

const Home = (props) => {
  const [searchText, setSearchText] = useState("");
  console.log("search text", searchText);
  console.log("inside Home ");

  const updateSearchText = (text) => {
    setSearchText(text);
  };
  return (
    <div className="home">
      <center>
        <h1>Home Page</h1>
      </center>
      <br />
      <BudgetOverview /> <br />
      <br />
      <div className="expenseParent">
        <div className="expenseDiv">
          <AddExpense /> <br />
        </div>
        <div className="searchDiv">
          <SearchBar updateSearchText={updateSearchText} />
        </div>
      </div>
      <center>
        <ExpenseTable searchText={searchText} />
      </center>
    </div>
  );
};

export default Home;
