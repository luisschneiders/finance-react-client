import { Pagination } from './Pagination';

export interface Bank {
  bankId: number;
  bankDescription: string;
  bankAccount: string;
  bankInitialBalance: number;
  bankCurrentBalance: number;
  bankIsActive: boolean;
  bankInsertedBy: number;
  bankCreatedAt: string;
  bankUpdatedAt: string;
}

export interface BankList {
  banks: Bank[];
  pagination: Pagination;
}

export interface BankStatusActive {
  banks: Bank[];
}
