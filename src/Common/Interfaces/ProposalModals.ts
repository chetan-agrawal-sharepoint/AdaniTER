import { IdTitleObject, User } from "../../Common/ICommonTypes";

export interface ProposalInterface extends IdTitleObject {
  PRNo: string;
  ItemDescription: string;
  ProposalDate: string;
  PurchasingGroup: IdTitleObject;
  Plant: any;
  Indenter?: User;
  Buyers: User[];
  Condition: string;
  LatestActionDate: string;
  AllDocsUploadedinSAPDMS: string;
  BudgetType: string;
  ProposalType: string;
  ProjectName: string;
  CompanyName: string;
  ChecklistGroup: IdTitleObject;
  LPP?: string;
  InternalEstimate?: string;
  ValueIn?: any;
  Priority?: IdTitleObject;
  TotalProposalValue?: string;
  DeviationfromLPP_InternalEstimat?: string;
  Note: string;
  LineItemQuantities: string;
  ProposalInitiation?: string;
  CurrentlyWith?: User[];
  QueryWithString?: string;
  IsActiveRecord?: string;
}

export interface VendorItem extends IdTitleObject {
  Ranking: string;
  Quoted: string;
  E_Auction: string;
  Negotiated: string;
  IsActiveRecord?: string;
  Category?: string;
  // ProposalNumber?: string;
}
