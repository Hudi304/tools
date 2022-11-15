import { API } from "@/api";
import { AccountStateDataModel } from '@/common/models/AccountStateDataModel.model';
import { AccountNonceInfoViewModel } from '@/common/models/AccountNonceInfoViewModel.model';

export const undefinedApi = (address: string): Promise<AccountStateDataModel> => {
  return API()
    .get(`/api/ledger/accounts/${address}`)
};

export const undefinedApi = (
  address: string
): Promise<AccountNonceInfoViewModel> => {
  return API()
    .get(`/api/ledger/accounts/${address}/nonces`)
};
