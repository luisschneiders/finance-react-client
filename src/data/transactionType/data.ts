import {
  TransactionType,
  TransactionTypeList
} from '../../models/TransactionType';

import {
  fetchTransactionTypeList,
  addTransactionType,
  updateTransactionType,
  fetchTransactionTypeById
} from '../api/TransactionType';

export const fetchTransactionTypedData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchTransactionTypeList(id, page, pageSize);
  return response as TransactionTypeList;
}

export const fetchTransactionTypeByIdData = async (userId: number, transactionTypeId: number) => {
  const response: any = await fetchTransactionTypeById(userId, transactionTypeId);
  return response as TransactionType;
}

export const addTransactionTypeData = async (data: Partial<TransactionType>) => {
  const response: any = await addTransactionType(data);
  return response as TransactionType;
}

export const updateTransactionTypeData = async (data: Partial<TransactionType>) => {
  const response: any = await updateTransactionType(data);
  return response as TransactionType;
}
