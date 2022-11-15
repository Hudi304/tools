import { API } from "@/api";
import { PendingTransactionViewModel } from '@/common/models/PendingTransactionViewModel.model';
import { SignatureViewModel } from '@/common/models/SignatureViewModel.model';

export const undefinedApi = (): Promise<PendingTransactionViewModel[]> => {
  return API()
    .get(`/api/mp/transactions`)
};

export const undefinedApi = (
  body: PendingTransactionViewModel
): Promise<PendingTransactionViewModel> => {
  return API()
    .post(`/api/mp/transactions`, body)
};

export const undefinedApi = (
  transactionId: string
): Promise<PendingTransactionViewModel> => {
  return API()
    .get(`/api/mp/transactions/${transactionId}`)
};

export const undefinedApi = (transactionId: string): Promise<null> => {
  return API()
    .post(`/api/mp/transactions/${transactionId}/cancel`)
};

export const undefinedApi = (
  transactionId: string,
  body: SignatureViewModel
): Promise<null> => {
  return API()
    .post(`/api/mp/transactions/${transactionId}/sign`, body)
};
