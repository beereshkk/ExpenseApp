import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { useSelector } from "react-redux";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseChart = (props) => {
  const budget = useSelector((state) => state.budget);
  const expenses = useSelector((state) => state.expenses);
  const categories = useSelector((state) => state.categories);
  let options;

  const findCategory = (exp) => {
    const res = categories.find((category) => {
      return exp.categoryId === category._id;
    });
    return res.name;
  };

  const categoriesAmount = {};
  categories.forEach((category) => {
    expenses.forEach((expense) => {
      const res = findCategory(expense);

      if (res === category.name) {
        if (categoriesAmount.hasOwnProperty(res)) {
          categoriesAmount[res] += Number(expense.amount);
        } else {
          categoriesAmount[res] = Number(expense.amount);
        }
      }
    });
  });

  console.log("categories amount", Object.entries(categoriesAmount));
  let expensesAmount = 0;
  expenses.forEach((expense) => {
    expensesAmount += +expense.amount;
  });

  const calculatePercentage = (num) => {
    let res = 100 - ((expensesAmount - num) / expensesAmount) * 100;
    return res;
  };

  options = {
    backgroundColor: "lemonchiffon",
    animationEnabled: true,
    title: {
      text: "",
    },
    subtitles: [
      {
        text: `Rs. ${expensesAmount}`,
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "pie",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: Object.entries(categoriesAmount).map(
          (categoryAmount, index) => {
            return {
              name: categoryAmount[0],
              y: calculatePercentage(categoryAmount[1]),
            };
          }
        ),
      },
    ],
    height: 300,
    width: 500,
  };
  return (
    <div className="block_container2 ">
      <center>
        <h3>Category</h3>
        <hr style={{ backgroundColor: "black" }} />
      </center>
      {/* <h1>Budget Overview</h1> */}
      <div>
        {expenses.length <= 50 ? (
          <div className="categoryChart">
            <CanvasJSChart options={options} />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Expense type</th>
                <th>Contribution to the total Expense</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => {
                return <tr></tr>;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
