import { combineReducers } from '../combineReducers';
import { sessionsReducer } from '../sessions/sessions.reducer';
import { userReducer } from '../user/user.reducer';
import { newsReducer } from '../news/news.reducer';
import { summaryReducer } from '../summary/summary.reducer';
import { transactionsReducer } from '../transactions/transactions.reducer';
import { expensesReducer } from '../expenses/expenses.reducer';
import { bankReducer } from '../bank/bank.reducer';
import { expenseTypeReducer } from '../expenseType/expenseType.reducer';
import { modalReducer } from '../modal/modal.reducer';
import { transactionTypeReducer } from '../transactionType/transactionType.reducer';
import { vehicleReducer } from '../vehicle/vehicle.reducer';
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
  bankReducer: {
    bankList: {
      banks: [],
      pagination: { page: 1, pageSize: PageSize.S_12, pageCount: 0, rowCount: 0 },
    },
    bank: {
      bankId: 0,
      bankDescription: '',
      bankAccount: '',
      bankInitialBalance: 0,
      bankCurrentBalance: 0,
      bankIsActive: false,
      bankInsertedBy: 0,
      bankCreatedAt: '',
      bankUpdatedAt: '',
    },
    isFetching: false,
    isSaving: false,
    showBankModal: false,
  },
  expenseTypeReducer: {
    expenseTypeList: {
      expensesType: [],
      pagination: { page: 1, pageSize: PageSize.S_12, pageCount: 0, rowCount: 0 },
    },
    expenseType: {
      expenseTypeId: 0,
      expenseTypeDescription: '',
      expenseTypeIsActive: false,
      expenseTypeInsertedBy: 0,
      expenseTypeCreatedAt: '',
      expenseTypeUpdatedAt: '',
    },
    isFetching: false,
    isSaving: false,
  },
  modalReducer: {
    isShowModalBank: false,
    isShowModalExpenseType: false,
    isShowModalTransactionType: false,
    isShowModalVehicle: false,
  },
  transactionTypeReducer: {
    transactionTypeList: {
      transactionsType: [],
      pagination: { page: 1, pageSize: PageSize.S_12, pageCount: 0, rowCount: 0 },
    },
    transactionType: {
      transactionTypeId: 0,
      transactionTypeDescription: '',
      transactionTypeAction: '',
      transactionTypeIsActive: false,
      transactionTypeInsertedBy: 0,
      transactionTypeCreatedAt: '',
      transactionTypeUpdatedAt: '',
    },
    isFetching: false,
    isSaving: false,
  },
  vehicleReducer: {
    vehicleList: {
      vehicles: [],
      pagination: { page: 1, pageSize: PageSize.S_12, pageCount: 0, rowCount: 0 },
    },
    vehicle: {
      vehicleId: 0,
      vehicleDescription: '',
      vehiclePlate: '',
      vehicleIsActive: false,
      vehicleInsertedBy: 0,
      vehicleCreatedAt: '',
      vehicleUpdatedAt: '',
    },
    isFetching: false,
    isSaving: false,
  },
};

export const rootReducer = combineReducers({
  sessionsReducer,
  userReducer,
  summaryReducer,
  transactionsReducer,
  newsReducer,
  expensesReducer,
  bankReducer,
  expenseTypeReducer,
  modalReducer,
  transactionTypeReducer,
  vehicleReducer,
});

export const reducers = (state: any, action: any) => {

  if (action.type === APP_STORE_RESET) {
    const { userReducer } = state;
    state = { ...initialState, userReducer };
  }

  return rootReducer(state, action)
}

export type AppState = ReturnType<typeof reducers>;
