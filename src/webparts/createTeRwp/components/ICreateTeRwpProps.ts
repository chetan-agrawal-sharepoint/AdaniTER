import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ChoiceGroup, Dropdown, IChoiceGroupOption, IDropdownOption, TextField } from '@fluentui/react';
import { ILookup, IPeopleGroup } from "../../../Common/ICommonTypes";
import { ISuccessErrorPopupProp } from "../../../Common/SuccessErrorPopup/ISuccessErrorPopup";
import { IFieldInfo } from "@pnp/sp/fields";


export interface ICreateTeRwpProps {
  //description: string;
  context: WebPartContext;
}

export interface IBuyers {
  ID: number;
  Title: string;
  Buyers: IPeopleGroup[];
}
export interface IWorkFlowType {
  ID: any;
  Title: string;
  WorkflowTypeUsedFor: ILookup;
  AuthorisedUsers: IPeopleGroup[];
  IsRateApplicableOnDraftStorage: string;
}

export interface ISubFunctions {
  ID: any;
  Title: string;
  //WorkflowTypeUsedFor: ILookup;
  AuthorisedUsers: IPeopleGroup[];
  //IsRateApplicableOnDraftStorage: string;
}

export interface IChoiceFieldInfo extends IFieldInfo {
  Choices: string[];
}
export interface ICreateTERRecord {
  ID: number;
  ScrapProposalCode: string;
  FinancialYear: string;
  RecordNo: string;
  FormatNo: string;
  Function: ILookup;//Dropdown
  ReferenceTERNumber: string;
  TERType: string;//Dropdown
  NameofServiceEquipment: string;
  EHVSubStationProject: string;
  EstimatedValue: string;
  DeliveryPeriod: string;
  ReferenceDocument: string;
  EquipmentDetails: string;
  ReferenceApprovalNoteNumberwithDate: string;
  NoofSuppliersVendors: string;
  ReferencePRNumber: string;
  WorkCompletionDate: Date;
  Attachemnts:string;
  //ReferenceTERNoData:ILookup;
  ReferenceTERNo:ILookup;
  CreationDate:Date;
  


  WorkflowType: IWorkFlowType;
  LastSalesOrder: string;
  Plant: string;
  PurchasingGroup: ILookup;
  Buyers: IPeopleGroup[];
  Title: string;
  SubjectScrapNote: string;
  Division: ILookup;//Dropdown
  DivisionID: string;
  DivisionText: string;
  ScrapDepartment: ILookup;
  ScrapDepartmentID: string;
  ScrapDepartmentText: string;
  Reference: string;
  Storage: string;//Radio
  StorageLocation: string;
  UserCustodyat: string;
  ScrapType: string;

  // ScrapItemImages: FileList;//File
  ScrapItemImages: string;//File
  MaterialconsumptionAnalysis: string;//File
  FormatAAttach: string;//File
  Format20Attach: string;//File
  WDVAttachment: string;//File
  WDVMailAttachment: string;//File
  ReferenceMail_Accounts_And_Finance: string;//File
  TypeofScrapNote: string;//Radio
  ParentScrapReference: string;//List

  //TypeofScrap:string;
  AssetNonAsset: string;//Radio
  Frequency: string;//Radio
  TypeofScrap: string;//Radio


  //AddDetails

  //  Background and Objectives
  Background: string;
  Objective: string;
  Justification: string;
  QuantumJustification: string;
  StatutoryRequirement: string;
  FeasibilityofaltUse: string;

  DraftRemarks: string;

  ScrapSummaryIDs: ILookup[];
}
export interface ICreateTERPropsState {
  RunningNo: string;
  isShowDraftModal: boolean;
  RecordNo: string;
  FormatNo: string;
  WorkflowTypeData: IWorkFlowType[];
  FunctionData: ILookup[];
  PlantData: ILookup[];
  PurchasingGroupData: IBuyers[];
  BuyerData: IPeopleGroup[];
  DivisionData: ILookup[];

  FinancialYearOptions: IDropdownOption[];
  DepartmentData: IDropdownOption[];
  Storage: IChoiceGroupOption[];
  ScrapType: IChoiceGroupOption[];


  ReferenceTERNumberOption: IChoiceGroupOption[];
  TERTypeOption: IChoiceGroupOption[];
  CreationDate: Date;
  NameofServiceEquipment: string;
  EHVSubStationProject: string;
  EstimatedValue: string;
  DeliveryPeriod: string;
  ReferenceDocument: string;
  EquipmentDetails: string;
  ReferenceApprovalNoteNumberwithDate: string;
  NoofSuppliersVendors: string;
  ReferencePRNumber: string;
  WorkCompletionDate: Date;
  ReferenceTERNoData:ILookup[];

  //Chetan--ShowHide
  ReferenceTERNumberShow: boolean;//Dropdown
  TERTypeShow: boolean;//Dropdown
  CreationDateShow: boolean;
  NameofServiceEquipmentShow: boolean;
  WorkflowTypeShow:boolean;
  EHVSubStationProjectShow:boolean;
  EstimatedValueShow:boolean;
  DeliveryPeriodShow:boolean;
  ReferenceDocumentShow:boolean;
  EquipmentDetailsShow:boolean;
  ReferenceApprovalNoteNumberwithDateShow:boolean;
  NoofSuppliersVendorsShow:boolean;
  ReferencePRNumberShow:boolean;
  WorkCompletionDateShow:boolean;



  AssetNonAssetOptions: IChoiceGroupOption[];
  FrequencyOptions: IChoiceGroupOption[];
  TypeofScrapOptions: IChoiceGroupOption[];
  MaterialCodeAvailableOptions: IChoiceGroupOption[];
  ScrapCodeAvailableOptions: IChoiceGroupOption[];
  TypeofScrapNoteData: IChoiceGroupOption[];
  UoMOptions: IDropdownOption[];

  selectedTab: number;
  IsLoader: boolean;
  showModalLoader: boolean;
  allItems: any[];
  listColumns: any[];
  selectedItem: ICreateTERRecord;
  selectedSummaryOfScrap: ISummaryOfScrap;
  prevRecord: ICreateTERRecord;
  isHideDialog: boolean;
  //ICreateScrapNoteErrorMessage: ICreateScrapNoteErrorMessage;
  //Chetan
  ICreateTERErrorMessage: ICreateTERErrorMessage;
  dialogTitle: string;
  dialogMessage: string;
  isAppModelShow: boolean;
  SuccessErrorPopup?: ISuccessErrorPopupProp;


  //File Upload
  new_Scrap_Item_Images: boolean;
  new_MaterialconsumptionAnalysis: boolean;
  new_FormatAAttach: boolean;
  new_Format20Attach: boolean;
  new_WDVAttachment: boolean;
  new_WDVMailAttachment: boolean;
  new_ReferenceMail_Accounts_And_Finance: boolean;
  new_Supportings_Images_Addt_Documents: boolean;
  //File Upload
}

export interface ISummaryOfScrap {
  //SummaryofScrapDetails:string;
  ID: any;
  Title: string;
  MaterialCodeAvailable?: string;//Radio
  MaterialCode: string;
  ScrapCodeAvailable?: string;//Radio
  ScrapCode: string;
  MaterialName: string;
  ScrapDescription: string;
  UoM: string;//DDL
  Quantitytobescrapped: string;
  WDVInventoryValue: string;
  EstimatedQuantityofScrap: string;
  RateasperlastLSO: string;
  Supportings_Images_Addt_Documents: string;//File
  UploadScrapDetailsExcelFile: string;//File
}

export interface ICreateTERErrorMessage {
  //chetan
  ReferenceTERNumber: string;//Dropdown
  TERType: string;//Dropdown
  CreationDate: Date;
  NameofServiceEquipment: string;
  EHVSubStationProject: string;
  EstimatedValue: string;
  DeliveryPeriod: string;
  ReferenceDocument: string;
  EquipmentDetails: string;
  ReferenceApprovalNoteNumberwithDate: string;
  NoofSuppliersVendors: string;
  ReferencePRNumber: string;
  WorkCompletionDate: Date;
  Attachemnts:string;
  Function: string;//Dropdown
  ReferenceTERNo:string;


  FormatApplicable: string;//Dropdown
  WorkflowType: string;
  Plant: string;
  PurchasingGroup: string;
  Buyer: string;
  Title: string;
  SubjectScrapNote: string;
  Division: string;//Dropdown
  ScrapDepartment: string;
  Reference: string;
  Storage: string;//Radio
  StorageLocation: string;
  UserCustodyat: string;
  ScrapType: string;
  ScrapItemImages: string;//File
  MaterialconsumptionAnalysis: string;//File
  FormatAAttach: string;//File
  Format20Attach: string;//File
  WDVAttachment: string;//File
  WDVMailAttachment: string;//File
  ReferenceMail_AccountsAndFinance: string;//File
  TypeofScrapNote: string;//Radio
  ParentScrapReference: string;//List

  //TypeofScrap:string;
  AssetNonAsset: string;//Radio
  Frequency: string;//Radio
  TypeofScrap: string;//Radio

  //SummaryofScrapDetails:string;
  MaterialCodeAvailable?: string;//Radio
  MaterialCode: string;
  ScrapCodeAvailable?: string;//Radio
  ScrapCode: string;
  MaterialName: string;
  ScrapDescription: string;
  UoM: string;//DDL
  Quantitytobescrapped: string;
  WDVInventoryValue: string;
  EstimatedQuantityofScrap: string;
  RateasperlastLSO: string;
  Supportings_Images_AdditionalDocuments: string;//File
  UploadScrapDetailsExcelFile: string;//File
  LastSalesOrder: string;
  //  Background and Objectives
  Background: string;
  Objective: string;
  Justification: string;
  QuantumJustification: string;
  StatutoryRequirement: string;
  FeasibilityofaltUse: string;
  DraftRemarks: string;
  FinancialYear: string;
}

