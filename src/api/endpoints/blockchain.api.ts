import { API } from "@/api";
import { AccountStateDataModel } from '@/common/models/AccountStateDataModel.model';

export const undefinedApi = (): Promise<AccountStateDataModel> => {
  return API()
    .get(`/api/ledger/blockchain/status`)
};
