import { combineReducers } from '../combineReducers';
import { sessionsReducer } from '../sessions/sessions.reducer';
import { userReducer } from '../user/user.reducer';
import { newsReducer } from '../news/news.reducer';
import { summaryReducer } from '../summary/summary.reducer';
import { transactionsReducer } from '../transactions/transactions.reducer';

export const initialState: AppState = {
  sessionsReducer: {
    menuEnabled: true,
    userProfile: null,
  },
  userReducer: {
    darkMode: false,
    hasSeenWelcome: false,
    isLoggedIn: false,
    favouriteNewsId: null,
    homeTimeTransition: '0',
    expensesTimeTransition: { startDate: '', endDate: '' },
  },
  newsReducer: {
    news: null,
    newsCategory: null,
  },
  summaryReducer: {
    summary: null,
  },
  transactionsReducer: {
    transactions: null,
  }
};

export const rootReducer = combineReducers({
  sessionsReducer,
  userReducer,
  summaryReducer,
  transactionsReducer,
  newsReducer,
});

export const reducers = (state: any, action: any) => {
  // TODO: reset partial store
  if (action.type === 'SET_RESET_APP_STORE') {
    state = initialState;
  }

  return rootReducer(state, action)
}

export type AppState = ReturnType<typeof reducers>;
