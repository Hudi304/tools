import { API } from "@/api";
import { AssetDataModel } from '@/common/models/AssetDataModel.model';

export const undefinedApi = (address: string): Promise<AssetDataModel[]> => {
  return API()
    .get(`/api/ledger/accounts/${address}/assets`)
};
