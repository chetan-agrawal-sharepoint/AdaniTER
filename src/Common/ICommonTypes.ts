import { IFieldInfo } from "@pnp/sp/fields";
export interface IdTitleObject {
  Id: any;
  Title?: string;
}

export interface User {
  Id: any;
  Title: string;
  UserName?: string;
}

export interface CommonResponse {
  Id: any;
  Title?: string;
}

export interface IPeopleGroup {
  ID: any;
  Title?: string;
  Name?: string;
  EMail?: string;
  UserName?: string;
}

export interface ILookup {
  ID: number;
  Title: string;
}

export interface IErrorLog {
  Title: string;
  ListName: string;
  MethodName: string;
  ErrorText: string;
  JsonRequest?: string;
}

export interface IBatchUpdateReq {
  ListName: string;
  IBatchItems: IBatchItems[];
}

export interface IBatchItems {
  Data: any;
  IsAdd: boolean;
  Id: any;
}
export interface IChoiceFieldInfo extends IFieldInfo {
  Choices: string[];
}