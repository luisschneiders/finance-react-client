import {
  TransactionType,
  TransactionTypeList,
  TransactionTypeStatusActive
} from '../../models/TransactionType';

import {
  fetchTransactionTypeList,
  addTransactionType,
  updateTransactionType,
  fetchTransactionTypeById,
  fetchTransactionTypeStatusActive
} from '../api/TransactionType';

export const fetchTransactionTypeData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchTransactionTypeList(id, page, pageSize);
  return response as TransactionTypeList;
}

export const fetchTransactionTypeStatusActiveData = async (userId: number) => {
  const response: any = await fetchTransactionTypeStatusActive(userId);
  return response as TransactionTypeStatusActive;
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
