export enum PRStatus {
  //indenter
  PendingToIndenter = "Indenter", //status when PR is pending for additional info
  RevertedToIndenter = "PR Reverted to Indenter for Additional Info", // status when L2 Head revert PR back to Indenter
  //indenter

  //l2 head
  PendingForAllocation = "Pending for Allocation", // status after indenter submits additional info
  //l2 head

  //buyer
  PendingForBuyerAction = "Pending for Buyer Action", // status of pr after allocating buyers and saving to next step (Buyer step)
  // WorkflowAssigned = "Workflow Assigned", //Workflow Assignment
  WorkflowAllocated = "Workflow Allocated",
  UnderApprovalProcess = "PR Under Approval Process", // status of pr when buyer puts it under approval process
  // PendingforAcceptancebyCPG = "PR Pending for Acceptance by CPG", // status when PR is Pending for Acceptance by CPG
  //buyer

  //Proposal Process
  FlowSentToProposal = "Sent to Proposal",
  PendingforProposal = "Refer Proposal Status",
  // ProposalProcessCompleted = "Proposal Process Completed", //comment this//pending at sagar's end
  //Proposal Process

  //closed
  Closed = "Closed", // status of PR when closed
  //closed
}

export enum ProposalStatus {
  Draft = "Draft",
  Submitted = "Submitted",
  Reverted = "Reverted",
  PartiallyAccepted = "Partially Accepted",
  Parked = "Parked",
  CycleEnd = "Completed",
}

export enum ListNames {
  ExcelProcessingListName = "ExcelProcessing",
  PRAdditionalInfoListName = "PRAdditionalInfo",
  ActivityLogs = "ActivityLogs",
  ErrorLog = "ErrorLog",
  PRHistory = "PRHistory",
  TransactionLog = "TransactionLog",
  PRWorkFlowSteps = "PRWorkFlowSteps",
  Proposal = "Proposal",
  ProposalChecklistItems = "ProposalChecklistItems",
  ArchivedProposal = "ArchivedProposal",
  WorkflowTypes = "WorkflowTypes",
  Buyers = "Buyers",
  Queries = "Queries",
  WorkflowActivities = "WorkflowActivities",
  AuditLog = "AuditLog",
  PlantRoleAssignment = "PlantRoleAssignment",
  Plant = "Plant",
  POListName = "PO",
  ProposalWorkFlowSteps = "ProposalWorkFlowSteps",
  GlobalParameters = "GlobalParameters",
  GlobalParameterScrap = "GlobalParameters_Scrap",
  CreateScrapNote = "CreateScrapNote",
  Divsions = "Divisions",
  Department = "Department",
  Function = "Function",
  Offices = "Offices",
  SummaryOfScrap = "SummaryOfScrap",
}

export enum ApprovalStepType { //from Workflow Steps
  L1HeadStep = "L1 Head Step",
  L2HeadStep = "L2 Head Step",
  L1L2HeadStep = "L1L2 Head Step",
  EBiddingStep = "E - Bidding Step",
  PlantHeadStep = "Plant Head Step",
  FinanceUser = "Finance User",
  TechnicalEvaluationStep = "Technical Evaluation Step",
  CPGHeadApprovalRequired = "CPG Head Approval Required",
  EngineeringEvaluation = "Engineering Evaluation",
}

export enum SitePages {
  viewQueriesPage = "/SitePages/Queries.aspx", //https://q3tech.sharepoint.com/sites/Adani-DominoApplications/PR-POTracker/SitePages/Queries.aspx
}

export enum DateTimeEnum {
  dateLocale = "en-GB",
  dateFormat = "dd/mm/yyyy",
  timeFormat = "HH:mm:ss",
}

export enum FileTypes {
  MaxFileCount = "10",
  Excel = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
  Photo = ".jpeg, .png",
}

export enum ModalSize {
  VerySmall,
  Small,
  Medium,
  Large,
}
