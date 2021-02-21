import { combineReducers } from '../combineReducers';
import { sessionsReducer } from '../sessions/sessions.reducer';
import { userReducer } from '../user/user.reducer';
import { newsReducer } from '../news/news.reducer';
import { summaryReducer } from '../summary/summary.reducer';
import { transactionsReducer } from '../transactions/transactions.reducer';
import { expensesReducer } from '../expenses/expenses.reducer';
import { expenseTypeReducer } from '../expenseType/expenseType.reducer';
import { APP_STORE_RESET } from '../actionTypes';
import { PageSize } from '../../enum/PageSize';

export const initialState: AppState = {
  sessionsReducer: {
    menuEnabled: true,
    userProfile: null,
    homeTimeTransition: '0',
    expensesTimeTransition: { startDate: '', endDate: '' },
    transactionsTimeTransition: { startDate: '', endDate: '' },
  },
  userReducer: {
    darkMode: false,
    hasSeenWelcome: false,
    isLoggedIn: false,
  },
  newsReducer: {
    news: null,
  },
  summaryReducer: {
    summary: null,
  },
  transactionsReducer: {
    transactions: null,
  },
  expensesReducer: {
    expenses: null,
  },
  expenseTypeReducer: {
    expenseTypeList: { expensesType: [], pagination: { page: 1, pageSize: PageSize.S_12, pageCount: 0, rowCount: 0} }
  }
};

export const rootReducer = combineReducers({
  sessionsReducer,
  userReducer,
  summaryReducer,
  transactionsReducer,
  newsReducer,
  expensesReducer,
  expenseTypeReducer,
});

export const reducers = (state: any, action: any) => {

  if (action.type === APP_STORE_RESET) {
    const { userReducer } = state;
    state = { ...initialState, userReducer };
  }

  return rootReducer(state, action)
}

export type AppState = ReturnType<typeof reducers>;
