import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import pageReducer from '../reducers/pageReducer'
import budgetReducer from '../reducers/budgetReducer'
import categoryReducer from '../reducers/categoryReducer'
import expenseReducer from '../reducers/expenseReducer'
import deletedExpensesReducer from '../reducers/deletedExpensesReducer'
import userReducer from '../reducers/userReducer'

const configureStore=()=>{
    const store=createStore(combineReducers({
        
        budget:budgetReducer,
        categories:categoryReducer,
        expenses:expenseReducer,
        deletedExpenses:deletedExpensesReducer,
        profilePic:userReducer,
        pageNum:pageReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore