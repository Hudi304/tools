import { API } from "@/api";
import { ExplorerTransaction } from '@/common/models/ExplorerTransaction.model';
import { ExplorerBlock } from '@/common/models/ExplorerBlock.model';
import { KnownNode } from '@/common/models/KnownNode.model';
import { AccountDataModel } from '@/common/models/AccountDataModel.model';
import { AssetDataModel } from '@/common/models/AssetDataModel.model';
import { ExplorerStateOperationDataModel } from '@/common/models/ExplorerStateOperationDataModel.model';

export const undefinedApi = (
  pageNumber: number | string,
  pageSize: number | string,
  transactionHash: string,
  fromAddress: string,
  toAddress: string,
  IsRejected: boolean,
  IsProgramExecution: boolean,
  BlockNo: string
): Promise<ExplorerTransaction[]> => {
  return API()
    .get(`/api/ex/transactions?`
      + `pageNumber=${pageNumber}&`
      + `pageSize=${pageSize}&`
      + `transactionHash=${transactionHash}&`
      + `fromAddress=${fromAddress}&`
      + `toAddress=${toAddress}&`
      + `IsRejected=${IsRejected}&`
      + `IsProgramExecution=${IsProgramExecution}&`
      + `BlockNo=${BlockNo}`)
};

export const undefinedApi = (
  transactionHash: string
): Promise<ExplorerTransaction> => {
  return API()
    .get(`/api/ex/transaction/${transactionHash}`)
};

export const undefinedApi = (
  pageNumber: number | string,
  pageSize: number | string,
  parentHash: string,
  blockHash: string
): Promise<ExplorerBlock[]> => {
  return API()
    .get(`/api/ex/blocks?`
      + `pageNumber=${pageNumber}&`
      + `pageSize=${pageSize}&`
      + `parentHash=${parentHash}&`
      + `blockHash=${blockHash}`)
};

export const undefinedApi = (blockHash: string): Promise<ExplorerBlock> => {
  return API()
    .get(`/api/ex/block/${blockHash}`)
};

export const undefinedApi = (): Promise<KnownNode[]> => {
  return API()
    .get(`/api/ex/nodes`)
};

export const undefinedApi = (address: string): Promise<AccountDataModel> => {
  return API()
    .get(`/api/ex/account/${address}`)
};

export const undefinedApi = (
  address: string,
  pageNumber: number | string,
  pageSize: number | string
): Promise<AssetDataModel> => {
  return API()
    .get(`/api/ex/assets/${address}?`
      + `pageNumber=${pageNumber}&`
      + `pageSize=${pageSize}`)
};

export const undefinedApi = (
  transactionHash: string,
  pageNumber: number | string,
  pageSize: number | string
): Promise<ExplorerStateOperationDataModel[]> => {
  return API()
    .get(`/api/ex/operations/${transactionHash}?`
      + `pageNumber=${pageNumber}&`
      + `pageSize=${pageSize}`)
};
