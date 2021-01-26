import { combineReducers } from '../combineReducers';
import { sessionsReducer } from '../sessions/sessions.reducer';
import { userReducer } from '../user/user.reducer';
import { newsReducer } from '../news/news.reducer';
import { summaryReducer } from '../summary/summary.reducer';
import { transactionsReducer } from '../transactions/transactions.reducer';
import { expensesReducer } from '../expenses/expenses.reducer';

export const initialState: AppState = {
  sessionsReducer: {
    menuEnabled: true,
    userProfile: null,
    homeTimeTransition: '0',
    expensesTimeTransition: { startDate: '', endDate: '' },
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
  }
};

export const rootReducer = combineReducers({
  sessionsReducer,
  userReducer,
  summaryReducer,
  transactionsReducer,
  newsReducer,
  expensesReducer,
});

export const reducers = (state: any, action: any) => {

  if (action.type === 'SET_RESET_APP_STORE') {
    const { userReducer } = state;
    state = { ...initialState, userReducer };
  }

  return rootReducer(state, action)
}

export type AppState = ReturnType<typeof reducers>;
