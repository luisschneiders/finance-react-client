import {
  Bank,
  BankList,
  BankStatusActive
} from '../../models/Bank';

import {
  fetchBankList,
  addBank,
  updateBank,
  fetchBankById,
  fetchBankStatusActive
} from '../api/Bank';

export const fetchBankData = async (id: number, page: number, pageSize: number) => {
  const response: any = await fetchBankList(id, page, pageSize);
  return response as BankList;
}

export const fetchBankStatusActiveData = async (userId: number) => {
  const response: any = await fetchBankStatusActive(userId);
  return response as BankStatusActive;
}

export const fetchBankByIdData = async (userId: number, bankId: number) => {
  const response: any = await fetchBankById(userId, bankId);
  return response as Bank;
}

export const addBankData = async (data: Partial<Bank>) => {
  const response: any = await addBank(data);
  return response as Bank;
}

export const updateBankData = async (data: Partial<Bank>) => {
  const response: any = await updateBank(data);
  return response as Bank;
}
