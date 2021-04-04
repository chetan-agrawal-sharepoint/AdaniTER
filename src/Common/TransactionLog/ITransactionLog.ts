export interface ITransactionLogProps {
  PrNo: string;
  cancelAction: Function;
}

export interface ITransactionLogState {
  IsLoader: boolean;
  allItems: ITransactionLogRecord[];
  listColumns: any[];
}

export interface ITransactionLogRecord {
  ID: string;
  Title: string;
  PRNo: string;
  Remarks: string;
  Created: string;
}
