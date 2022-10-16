import React from 'react'
import {CanvasJSChart} from 'canvasjs-react-charts'
import { useSelector } from 'react-redux'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseChart from './ExpenseChart';

const TestComp=(props)=>{
    const budget=useSelector(state=>state.budget)
    const expenses=useSelector(state=>state.expenses)
    let expensesAmount=0
    expenses.forEach((expense)=>{
        expensesAmount+=+expense.amount
    })
    let expensesPercentage=100 -((((Number(budget.amount))-expensesAmount)/Number(budget.amount))*100)
    console.log('expensesPercentage',expensesPercentage,typeof expensesPercentage)

    console.log('expenses',expensesAmount)
    const options = {
        animationEnabled: true,
        backgroundColor: "lemonchiffon",
        title: {
            text: ""
        },
        subtitles: [{
            text: `${Math.ceil(expensesPercentage)}% spent`,
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "Expenses", y:expensesPercentage },
                
            ]
        }],
       height:300,
       width:300
    }

    return (
        <div className='mainOverview'>
            <div className='budgetContainer card '>
                <center><h3 className='card-title'>Budget Overview</h3><hr style={{backgroundColor:'black'}}/></center>
                <div className='flexbox-container '>
                    <div className='fi test1'>
                        {expensesAmount===0?<h3>No Expenses added yet</h3>:<CanvasJSChart options = {options} />}
                        
                    </div>
                    <div className='fi test2'>
                        
                            <h3>Total Budget</h3>
                            <h4>Rs. {budget?budget.amount:'0'}</h4><br /><br />
                            <h3>Total Expenses</h3>
                            <h4>Rs. {expensesAmount}</h4>
                        
                    </div>
                </div>     
             </div>
             <div  >
                     <ExpenseChart />
                </div>
         </div>
    )
}

export default TestComp