import React, { useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startGetUser } from "./actions/loginAction";
import { startGetBudget } from "./actions/budgetAction";
import { startGetCategories } from "./actions/categoriesAction";
import { startGetExpenses } from "./actions/ExpenseAction";
import { startGetAllDeletedExpenses } from "./actions/deletedExpensesAction";

import TabComp from "./TabComp";

const App = (props) => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  console.log("token in App.js", token);
  useEffect(() => {
    if (token) {
      dispatch(startGetCategories(token));
      dispatch(startGetExpenses(token));
      dispatch(startGetAllDeletedExpenses(token));
      //dispatch(startGetUser())
      dispatch(startGetBudget(token));
      props.history.replace("/home");
    } else {
      props.history.replace("/login");
    }
  }, []);

  return (
    <div>
      <TabComp />
    </div>
  );
};

export default withRouter(React.memo(App));
