import { ILookup, IPeopleGroup } from "../ICommonTypes";

export interface IExcelProcessing {
    ID?: number;
    Title?: string;
    PR_No: string;
    PurchasingGroup: ILookup;
    Plant: ILookup;
    CR_Date: string;
    RevertReason: ILookup[];
    RevertRemarks: string;
    SentBy: IPeopleGroup;
    ReplyOn: string;
    SentTo: IPeopleGroup;
    CreatedBy: IPeopleGroup;
    AdditionalInfoID: ILookup;
    PendingAt: string;
    AdditionalInfoSubmissionDate: string;
    Item_No: string;
    Mat_No: string;
    Quantity: string;
    UnitOfMeasure: string;
    ReleaseDate: string;
    Short_Text: string;
    IsActiveRecord?: string;
    Rel_Ind: string;
    Process_Stat: string;
    Status: string;
}
export interface IPRAdditionalInfo {
    ID?: number;
    Title?: string;
    RevertReason: ILookup[];
    RevertRemarks: string;
    Package: string;
    Project_OandM: string;
    ProjectName: string;
    EquipmentDescription: string;
    Buyers: IPeopleGroup[];
    TechnicalEvaluator: IPeopleGroup[];
    SentBy: IPeopleGroup;
    ReplyOn: string;
    SentTo: IPeopleGroup;
    // Four
    EstimatedValueOfPR: string;
    RequiredAtSite: string;
    ProposalApprovedBy: IPeopleGroup[];
    ProposalApprovedOn: string;
    ProposalCSC_Mgmnt_PresentationDt: string;
    ProposalApprovedByCSC_Mgmt_On: string;
    // Four

    // Text and File
    TechnicalSpecifications: string;
    TechnicalSpecificationsFile: string;
    SpecialConditionForContract: string;
    SpecialConditionForContractFile: string;
    NeedValWithProject: string;
    NeedValWithProjectFile: string;
    PackagingPhilosophy: string;
    PackagingPhilosophyFile: string;
    BOQ: string;
    BOQFile: string;
    TermSheet: string;
    TermSheetFile: string;
    Drawing: string;
    DrawingFile: string;
    VendorQualificationCriteria: string;
    VendorQualificationCriteriaFile: string;
    BudgetAvailability: string;
    BudgetAvailabilityFile: string;
    OtherDetails: string;
    OtherDetailsFile: string;
    // Text and File
}
