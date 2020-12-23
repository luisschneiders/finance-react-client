import { combineReducers } from '../combineReducers';
import { sessionsReducer } from '../sessions/sessions.reducer';
import { userReducer } from '../user/user.reducer';
import { newsReducer } from '../news/news.reducer';
import { summaryReducer } from '../summary/summary.reducer';
import { transactionsReducer } from '../transactions/transactions.reducer';

export const initialState: AppState = {
  // An example of reducer
  // exampleReducer: {
  //   example: null
  // }
  sessionsReducer: {
    loading: false,
    menuEnabled: true,
  },
  userReducer: {
    darkMode: false,
    hasSeenWelcome: false,
    isLoggedin: false,
    loading: false,
    favouriteNewsId: null,
    userCredentials: {},
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

export const reducers = combineReducers({
  // exampleReducer: exampleReducer,
  sessionsReducer,
  userReducer,
  summaryReducer,
  transactionsReducer,
  newsReducer,
});


export type AppState = ReturnType<typeof reducers>;