import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startCreateBudget, startGetBudget } from "../actions/budgetAction";
import {
  startCreateCategory,
  startGetCategories,
} from "../actions/categoriesAction";
import CategoryItem from "./categoryItem";
import CategoryForm from "./categoryForm";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = (props) => {
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const dispatch = useDispatch();

  const budgetAmount = useSelector((state) => state.budget);
  console.log("state budget amount", budgetAmount);
  const [budget, setBudget] = useState(
    budgetAmount.amount ? budgetAmount.amount : "0"
  );
  const err = {};
  const [errors, setErrors] = useState({});
  const allCategories = useSelector((state) => state.categories);
  const validCategories = allCategories.filter(
    (ele) => ele.name !== "uncategorized"
  );
  const handleChange = (e) => {
    const val = e.target.value;
    setBudget(val);
  };

  const runValidators = () => {
    console.log(budget.length == 0 || budget == "0");
    console.log(budget, typeof budget);
    if (budget == "" || budget == "0") {
      err.budgetError = "Budget cannot be zero or empty";
    }
  };
  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    runValidators();
    console.log("Object.keys(err).length", Object.keys(err).length);
    if (Object.keys(err).length > 0) {
      setErrors(err);
    } else {
      console.log("inside else condition");
      setErrors({});
      dispatch(startCreateBudget({ amount: budget }, token));
    }
  };

  return (
    <div style={{ alignContent: "center" }}>
      <h1>Settings Page</h1>
      <form onSubmit={handleBudgetSubmit}>
        <h2>Total Budget:</h2>
        <div className="row">
          <div className="col-md-6">
            <input
              type="string"
              className="form-control"
              value={budget}
              name="budget"
              onChange={handleChange}
              placeholder="Enter your budget in rupees"
              disabled={budgetAmount.amount > 0}
            />
            {errors && <p style={{ color: "red" }}>{errors.budgetError}</p>}
          </div>
          <div className="col-md-3">
            <input
              type="submit"
              value="Update"
              className="btn btn-primary budgetBtn"
              disabled={budgetAmount.amount > 0}
            />
          </div>
        </div>
        <div></div>
      </form>
      <br />
      <CategoryForm /> <br />
      <h3>Listing all added categories :</h3>
      <ul className="list-group">
        {validCategories.length == 0 ? (
          <h3>No Categories added yet. Add your first!</h3>
        ) : (
          validCategories.map((category) => {
            return (
              <li key={category._id} className="list-group-item ">
                <CategoryItem category={category} token={token} />
              </li>
            );
          })
        )}
      </ul>
      <br />
      <br />
    </div>
  );
};

export default Settings;
