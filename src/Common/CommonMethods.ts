import { IdTitleObject, IErrorLog, User } from "./ICommonTypes";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup";
import { ApprovalStepType, ListNames, SitePages } from "../service/enums";
import serviceAPI from "../service/serviceAPI";
import utility from "../service/utility";
// import * as _ from "lodash";

export const MaxTextFieldLength = 256;

export const consoleLogger = (log) => {
  //TODO: for production build don't log anything to console
  console.log(log);
};

export const getDDOptions = (array: any[]): IDropdownOption[] => {
  let options: IDropdownOption[] = [];
  let option: IDropdownOption;
  array.filter((item) => {
    option = { key: item.Id, text: item.Title };
    options.push(option);
  });
  return options;
};

export const getCGOptions = (array: any[]): IChoiceGroupOption[] => {
  let options: IChoiceGroupOption[] = [];
  let option: IChoiceGroupOption;
  array.filter((item) => {
    option = { key: item.Id, text: item.Title };
    options.push(option);
  });
  return options;
};

export const getUserList = (users: User[]): any[] => {
  let UsersList = [];
  if (users != null && users != undefined) {
    UsersList = users.map((item) => {
      return {
        Id: item.Id,
        Title: item.Title,
        UserName: item.UserName,
      };
    });
  }
  return UsersList;
};

export const LoaderControl = (self: any, control: boolean) =>
  self.setState({ IsLoader: control });

export const ShowSucErrPopup = (
  self: any,
  Title: string,
  Message: string,
  action: string,
  OkFunction?: Function
) => {
  self.setState({
    SuccessErrorPopup: {
      showPopup: true,
      Title: Title,
      Message: Message,
      OkFunction: () => {
        self.setState({ SuccessErrorPopup: null });
        if (OkFunction) OkFunction();
      },
      action: action,
    },
  });
};

export const ShowSucErrPopupFunctional = (
  state: any,
  setState: any,
  Title: string,
  Message: string,
  action: string,
  OkFunction?: Function
) => {
  setState((prevState) => {
    return {
      ...prevState,
      SuccessErrorPopup_: {
        showPopup: true,
        Title: Title,
        Message: Message,
        OkFunction: () => {
          setState((prevState) => {
            return { ...prevState, SuccessErrorPopup_: null };
          });
          if (OkFunction) OkFunction();
        },
        action: action,
      },
    };
  });
};

export const AddErrorLog = (
  ModuleName: string,
  LsitName: string,
  MethodName: string,
  error: any,
  JsonRequest?: string
) => {
  let jsr = "";
  try {
    jsr = JsonRequest ? JSON.stringify(JsonRequest) : "";
  } catch (ex) {}
  const errorLog: any = {
    Title: ModuleName,
    ListName: LsitName,
    MethodName: MethodName,
    ErrorText: error.Message,
  };
  if (!utility.IsStringNullorEmpty(jsr)) errorLog.JsonRequest = jsr;
  serviceAPI
    .addErrorLog(errorLog)
    .then(() => {
      consoleLogger(error);
    })
    .catch((_error: any) => {
      consoleLogger(error);
      consoleLogger(_error);
    });
};

export const IsNullOrBlank = (str: any) => {
  return str == null || str == "";
};

export const getUniqueNo = () => {
  return new Date().getTime();
};

// export async function getClientIp(): Promise<string> {
//   return await fetch("https://api.ipify.org?format=json")
//     .then((response) => {
//       return response.json();
//     })
//     .then((res: any) => {
//       return _.get(res, "ip");
//     });
// }

export const numberRestrictionFunction = (evt) => {
  consoleLogger(evt.key);
  (evt.key === "e" || evt.key === "+" || evt.key === "-" || evt.key === ".") &&
    evt.preventDefault();
};
export const numberRestrictionFunctionOnPaste = (evt) =>
  //(evt.key === "e" || evt.key === "+" || evt.key === "-" || evt.key === ".") &&
  evt.preventDefault();

export const RedirectTo = (context, url) =>
  (window.location.href =
    context.pageContext.web.serverRelativeUrl + "/SitePages" + url);

export const GetQueryString = (string: string): string =>
  new URLSearchParams(window.location.search).get(string);

export const getActivityChanges = (prevRecord: any, selectedState: any) => {
  let Activity = {
    Field: [],
    NewValue: [],
    OldValue: [],
  };
  if (prevRecord) {
    if (Object.keys(prevRecord).length == Object.keys(selectedState).length) {
      for (var i = 0; i < Object.keys(prevRecord).length; i++) {
        let key = Object.keys(prevRecord)[i];
        let prevVal = prevRecord[key] == null ? "" : prevRecord[key];
        let selectedVal = selectedState[key] == null ? "" : selectedState[key];
        if (prevVal != selectedVal) {
          let pv =
            typeof prevVal == "object" && prevVal.length > 0
              ? prevVal.map((item) => item.Title).join(", ")
              : prevVal;
          let cv =
            typeof selectedVal == "object" && selectedVal.length > 0
              ? selectedVal.map((item) => item.Title).join(", ")
              : selectedVal;

          Activity.Field.push(key);
          Activity.NewValue.push(cv);
          Activity.OldValue.push(pv);
        }
      }
    }
  } else {
    for (var k = 0; k < Object.keys(selectedState).length; k++) {
      let key = Object.keys(prevRecord)[k];
      Activity.Field.push(key);
      Activity.NewValue.push(selectedState[key]);
    }
    Activity.OldValue = [];
  }

  return Activity;
};

// export const InitializeObject = (obj) => {
//   //TODO: Doesn't work
//   let myObject = {
//     ...obj,
//   };
//   for (var propertyName in myObject) {
//     if (typeof myObject[propertyName] == "string") myObject[propertyName] = "";
//     else if (typeof myObject[propertyName] == "number")
//       myObject[propertyName] = 0;
//     else if (typeof myObject[propertyName] == "boolean")
//       myObject[propertyName] = false;
//     else myObject[propertyName] = null;
//   }
//   return myObject;
// };

export const isUndefinedOrNull = (value: any): boolean => {
  return typeof value == "undefined" || value == null || value == "";
};

export const getFlowRecordFromWorkflowActivity = async (
  workflowTitle: string
): Promise<any[]> => {
  try {
    const arr = await serviceAPI.getLargeListItems(
      ListNames.WorkflowActivities,
      [
        "*",
        "Function/ID",
        "Function/Title",

        "SubFunction/ID",
        "SubFunction/Title",

        "WorkflowType/ID",
        "WorkflowType/Title",

        "SectionApprovers/ID",
        "SectionApprovers/Title",
        "SectionApprovers/Name",
        "SectionApprovers/UserName",

        "RevertLevelNo/ID",
        "RevertLevelNo/Title",

        "NotifiedUsers/ID",
        "NotifiedUsers/Title",
        "NotifiedUsers/Name",
        "NotifiedUsers/UserName",

        "SectionName/ID",
        "SectionName/Title",

        "WorkflowTypeUsedFor/ID",
        "WorkflowTypeUsedFor/Title",

        "FYIUsers/ID",
        "FYIUsers/Title",
        "FYIUsers/Name",
        "FYIUsers/UserName",

        "Roles/ID",
        "Roles/Title",

        "Author/ID",
        "Author/Title",
        "Author/Name",
        "Author/UserName",

        "Editor/ID",
        "Editor/Title",
        "Editor/Name",
        "Editor/UserName",
      ],
      [
        "Function",
        "SubFunction",
        "WorkflowType",
        "SectionApprovers",
        "NotifiedUsers",
        "RevertLevelNo",
        "SectionName",
        "WorkflowTypeUsedFor",
        "FYIUsers",
        "Roles",
        "Author",
        "Editor",
      ],
      `WorkflowType/Title eq '${workflowTitle}'`
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.WorkflowActivities,
      "getFlowRecordFromWorkflowActivity()",
      error
    );
  }
};

export const getTechnicalEvaluatorFromAdditionalInfo = async (
  PRNo: string
): Promise<any[]> => {
  try {
    const arr = await serviceAPI.getListItems(
      ListNames.PRAdditionalInfoListName,
      [
        "Title",
        "TechnicalEvaluator/ID",
        "TechnicalEvaluator/Title",
        "TechnicalEvaluator/Name",
        "TechnicalEvaluator/UserName",
      ],
      ["TechnicalEvaluator"],
      "Title eq '" + PRNo + "'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.PRAdditionalInfoListName,
      "getTechnicalEvaluatorFromAdditionalInfo()",
      error
    );
  }
};
export const getEBidingUserFromGlobalParameter = async (): Promise<any[]> => {
  try {
    const arr = await serviceAPI.getListItems(
      ListNames.GlobalParameters,
      [
        "Title",
        "EBiddingTeam/ID",
        "EBiddingTeam/Title",
        "EBiddingTeam/Name",
        "EBiddingTeam/UserName",
      ],
      ["TechnicalEvaluator"],
      "IsActiveRecord eq 'Yes'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.GlobalParameters,
      "getEBidingUserFromGlobalParameter()",
      error
    );
  }
};
export const getPlantHeadFromPlant = async (
  PlantCode: string
): Promise<any[]> => {
  try {
    const arr = await serviceAPI.getListItems(
      ListNames.Plant,
      ["PlantCode", "Heads/ID", "Heads/Title", "Heads/Name", "Heads/UserName"],
      ["Heads"],
      "PlantCode eq '" + PlantCode + "'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.Plant,
      "getPlantHeadFromPlant()",
      error
    );
  }
};

export const getFinanceUsersFromPlant = async (
  PlantCode: string
): Promise<any[]> => {
  try {
    const arr = await serviceAPI.getListItems(
      ListNames.Plant,
      [
        "PlantCode",
        "FinanceUsers/ID",
        "FinanceUsers/Title",
        "FinanceUsers/Name",
        "FinanceUsers/UserName",
      ],
      ["FinanceUsers"],
      "PlantCode eq '" + PlantCode + "'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.Plant,
      "getFinanceUsersFromPlant()",
      error
    );
  }
};

export const getCPGHeadFromBuyer = async (
  PurchasingGroupTitle: string
): Promise<any[]> => {
  try {
    let arr = await serviceAPI.getListItems(
      ListNames.Plant,
      [
        "PlantCode",
        "VerticalHeads/ID",
        "VerticalHeads/Title",
        "VerticalHeads/Name",
        "VerticalHeads/UserName",
      ],
      ["VerticalHeads"],
      "Title eq '" + PurchasingGroupTitle + "'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.Plant,
      "getCPGHeadFromBuyer()",
      error
    );
  }
};

export const getL2HeadFromBuyer = async (
  PurchasingGroupTitle: string
): Promise<any[]> => {
  try {
    let arr = await serviceAPI.getListItems(
      ListNames.Buyers,
      [
        "Title",
        "L2Heads/ID",
        "L2Heads/Title",
        "L2Heads/Name",
        "L2Heads/UserName",
      ],
      ["L2Heads"],
      "Title eq '" + PurchasingGroupTitle + "'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.Plant,
      "PurchasingGroupTitle()",
      error
    );
  }
};

export const getDataFromPlantRoleAssignment = async (
  PlantCode: string,
  Role: string
): Promise<any[]> => {
  try {
    const arr = await serviceAPI.getListItems(
      ListNames.PlantRoleAssignment,
      [
        "Title",
        "Roles/ID",
        "Roles/Title",
        "AssignUser/ID",
        "AssignUser/Title",
        "AssignUser/Name",
        "AssignUser/UserName",
      ],
      ["Roles", "CreatAssignUseredBy"],
      "Title eq '" + PlantCode + "' and Roles/Title eq '" + Role + "'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.PlantRoleAssignment,
      "getDataFromPlantRoleAssignment()",
      error
    );
  }
};

export const getBuyerFromAdditionalInfo = async (
  PRNO: string
): Promise<any[]> => {
  try {
    const arr = await serviceAPI.getListItems(
      ListNames.PRAdditionalInfoListName,
      ["Title", "Buyers/ID", "Buyers/Title", "Buyers/Name", "Buyers/UserName"],
      ["Buyers"],
      "Title eq '" + PRNO + "'",
      5000
    );
    return arr;
  } catch (error) {
    AddErrorLog(
      "CommonMethods",
      ListNames.PRAdditionalInfoListName,
      "getBuyerFromAdditionalInfo()",
      error
    );
  }
};

export const getFlowApprover = async (
  item: any,
  PRNo: string,
  PlantCode: string,
  PurchasingGroupTitle: string
) => {
  let approver = null;
  let data;

  if (item.StepType == "Approval") {
    if (item.SectionApprovers != null) {
      approver = item.SectionApprovers;
    } else if (!IsNullOrBlank(item.ApprovalStepType)) {
      switch (item.ApprovalStepType) {
        case String(ApprovalStepType.EngineeringEvaluation): //Engineering Evaluation/Technical Evaluation Step
          data = await getTechnicalEvaluatorFromAdditionalInfo(PRNo);
          if (data.length > 0) approver = data[0].TechnicalEvaluator;
          break;
        case String(ApprovalStepType.TechnicalEvaluationStep): //Engineering Evaluation/Technical Evaluation Step
          data = await getTechnicalEvaluatorFromAdditionalInfo(PRNo);
          if (data.length > 0) approver = data[0].TechnicalEvaluator;
          break;

        case String(ApprovalStepType.L1HeadStep): // L2 Head Step From Buyer List
          data = await getL2HeadFromBuyer(PurchasingGroupTitle);
          if (data.length > 0) approver = data[0].L2Heads; //TODO
          break;
        case String(ApprovalStepType.L2HeadStep): // L2 Head Step From Buyer List
          data = await getL2HeadFromBuyer(PurchasingGroupTitle);
          if (data.length > 0) approver = data[0].L2Heads;
          break;
        case String(ApprovalStepType.L1L2HeadStep): // L2 Head Step From Buyer List
          data = await getL2HeadFromBuyer(PurchasingGroupTitle);
          if (data.length > 0) approver = data[0].L2Heads; //TODO
          break;

        case String(ApprovalStepType.EBiddingStep): // E - Bidding Step Global parameters
          data = await getEBidingUserFromGlobalParameter();
          if (data.length > 0) approver = data[0].EBiddingTeam;
          break;
        case String(ApprovalStepType.PlantHeadStep): // Plant Head Step -> Plant Master
          data = await getPlantHeadFromPlant(PlantCode);
          if (data.length > 0) approver = data[0].Heads;
          break;
        case String(ApprovalStepType.FinanceUser): // Finance User -> Plant Master
          data = await getFinanceUsersFromPlant(PlantCode);
          if (data.length > 0) approver = data[0].FinanceUsers;
          break;
        case String(ApprovalStepType.CPGHeadApprovalRequired): // CPG Head Approval Required -> CPG Heads (also called verticle heads) are defined under Pur Group master
          data = await getCPGHeadFromBuyer(PurchasingGroupTitle);
          if (data.length > 0) approver = data[0].VerticalHeads;
          break;
        default:
          // PlantRoleAssignment
          const d = await getDataFromPlantRoleAssignment(
            PlantCode,
            item.ApprovalStepType
          );
          if (d != null) {
            approver = d[0].AssignUser;
          }
          console.log("approversd" + approver);
          break;
      }
    } else {
      if (item.ApprovalL1 == "Yes") {
        //TODO: L1 Approver, leave it for now
      } else if (item.ApprovalL2 == "Yes") {
        //TODO: L2 Approver, leave it for now
      } else if (
        (item.ApprovalL1 == "Yes" && item.ApprovalL2 == "Yes") ||
        item.ApprovalL1L2 == "Yes"
      ) {
        //TODO: L1 and L2 Approver, leave it for now
      }
    }
  } else if (item.StepType == "Data Entry") {
    if (item.NotifiedUsers != null) {
      approver = item.NotifiedUsers;
    } else {
      data = await getBuyerFromAdditionalInfo(PRNo);
      if (data.length > 0) approver = data[0].Buyers;
    }
  }

  return approver;
};

export const GetFlowDataAndSave = async (
  context: WebPartContext,
  folderName: string,
  workflowTitle: string,
  PRNo: string,
  PRPlantCode: string,
  PurchasingGroupTitle: string,
  listName: string,
  ProposalNumber?: string
): Promise<any> => {
  const webUrl = context.pageContext.legacyPageContext.webAbsoluteUrl;

  let wfRecord = await getFlowRecordFromWorkflowActivity(workflowTitle);
  let batchItems = [];
  let ifReachedProposalStep = false;
  let i = 0;

  while (i < wfRecord.length) {
    let item = wfRecord[i];

    if (
      (listName == ListNames.PRWorkFlowSteps && !ifReachedProposalStep) ||
      (listName == ListNames.ProposalWorkFlowSteps && ifReachedProposalStep)
    ) {
      const approver = await getFlowApprover(
        item,
        PRNo,
        PRPlantCode,
        PurchasingGroupTitle
      );

      let obj = {
        PRNo: String(PRNo),
        StepApprover:
          approver == null
            ? null
            : JSON.stringify(approver.map((item) => ({ Key: item.Name }))),

        Title: String(item.Title), //StepName
        Function: !isUndefinedOrNull(item.FunctionId)
          ? String(item.FunctionId)
          : "",
        SubFunction: !isUndefinedOrNull(item.SubFunctionId)
          ? String(item.SubFunctionId)
          : "",
        WorkflowType: String(item.WorkflowType.ID),
        LevelNo: String(item.LevelNo),
        SequenceNo: String(item.SequenceNo),
        ShowAttachmentForApproval: String(item.ShowAttachmentForApproval),
        ApprovalReuiredFromAll: String(item.ApprovalReuiredFromAll),
        RevertRequired: String(item.RevertRequired),
        RevertLevelNo: String(
          item.RevertLevelNo == null ? "" : item.RevertLevelNo.ID
        ),
        TextFieldType: !isUndefinedOrNull(item.TextFieldType)
          ? String(item.TextFieldType)
          : "",
        TextFieldLabel: !isUndefinedOrNull(item.TextFieldLabel)
          ? String(item.TextFieldLabel)
          : "",
        TextFieldMandatory: !isUndefinedOrNull(item.TextFieldMandatory)
          ? String(item.TextFieldMandatory)
          : "",
        SendLinkInMail: !isUndefinedOrNull(item.SendLinkInMail)
          ? String(item.SendLinkInMail)
          : "",
        NotifiedUsers:
          item.NotifiedUsers == null
            ? null
            : JSON.stringify(
                item.NotifiedUsers.map((item) => ({ Key: item.Name }))
              ),
        IsStepOptional: String(item.IsStepOptional),
        NoOfDays: !isUndefinedOrNull(item.NoOfDays)
          ? String(item.NoOfDays)
          : "",
        ShowOption: !isUndefinedOrNull(item.ShowOption)
          ? String(item.ShowOption)
          : "",
        ShowRemarksToCEO: !isUndefinedOrNull(item.ShowRemarksToCEO)
          ? String(item.ShowRemarksToCEO)
          : "",
        EndOfApprovalCycle: !isUndefinedOrNull(item.EndOfApprovalCycle)
          ? String(item.EndOfApprovalCycle)
          : "",
        PreviousStepNo: !isUndefinedOrNull(item.PreviousStepNo)
          ? String(item.PreviousStepNo)
          : "",
        DateFieldRequiredForEntry: !isUndefinedOrNull(
          item.DateFieldRequiredForEntry
        )
          ? String(item.DateFieldRequiredForEntry)
          : "",
        AskApproverToSkipNextStep: !isUndefinedOrNull(
          item.AskApproverToSkipNextStep
        )
          ? String(item.AskApproverToSkipNextStep)
          : "",
        SectionName: !isUndefinedOrNull(item.SectionNameId)
          ? String(item.SectionNameId)
          : "",
        MailToL1Head: !isUndefinedOrNull(item.MailToL1Head)
          ? String(item.MailToL1Head)
          : "",
        MailToL2Head: !isUndefinedOrNull(item.MailToL2Head)
          ? String(item.MailToL2Head)
          : "",
        MailToCPG: !isUndefinedOrNull(item.MailToCPG)
          ? String(item.MailToCPG)
          : "",
        FYIUsers:
          item.FYIUsers == null
            ? null
            : JSON.stringify(item.FYIUsers.map((item) => ({ Key: item.Name }))),
        QueryRequired: !isUndefinedOrNull(item.QueryRequired)
          ? String(item.QueryRequired)
          : "",
        UserResponsible: !isUndefinedOrNull(item.UserResponsible)
          ? String(item.UserResponsible)
          : "",
        EditApprover: !isUndefinedOrNull(item.EditApprover)
          ? String(item.EditApprover)
          : "",
        Roles: !isUndefinedOrNull(item.RolesId) ? String(item.RolesId) : "",
        StepType: !isUndefinedOrNull(item.StepType)
          ? String(item.StepType)
          : "",
        ApproverType: !isUndefinedOrNull(item.ApproverType)
          ? String(item.ApproverType)
          : "",
        ApprovalStepType: !isUndefinedOrNull(item.ApprovalStepType)
          ? String(item.ApprovalStepType)
          : "",
      };

      if (listName == ListNames.PRWorkFlowSteps) {
        obj["SendToBuyerForProposalCreation"] = !isUndefinedOrNull(
          item.SendToBuyerForProposalCreation
        )
          ? String(item.SendToBuyerForProposalCreation)
          : "";
        obj["IsDataEntryChecklistRequired"] = !isUndefinedOrNull(
          item.IsDataEntryChecklistRequired
        )
          ? String(item.ProcessNote)
          : "";
        obj["ProcessNote"] = !isUndefinedOrNull(item.ProcessNote)
          ? String(item.ProcessNote)
          : "";
        obj["AllowRateUpdation"] = !isUndefinedOrNull(item.AllowRateUpdation)
          ? String(item.AllowRateUpdation)
          : "";
        obj["IsAttachmentMandatoryForApproval"] = !isUndefinedOrNull(
          item.IsAttachmentMandatoryForApproval
        )
          ? String(item.IsRemarkMandatoryForApprovalStep)
          : "";
        obj["IsRemarkMandatoryForApprovalStep"] = !isUndefinedOrNull(
          item.IsRemarkMandatoryForApprovalStep
        )
          ? String(item.IsRemarkMandatoryForApprovalStep)
          : "";
        obj["IsApprovalWithCondition"] = String(item.IsApprovalWithCondition);
        obj["SectionApprovers"] =
          item.SectionApprovers == null
            ? null
            : JSON.stringify(
                item.SectionApprovers.map((item) => ({ Key: item.Name }))
              );
        obj["VendorSearchStep"] = !isUndefinedOrNull(item.VendorSearchStep)
          ? String(item.VendorSearchStep)
          : "";
        obj["CommercialNegotiationStep"] = !isUndefinedOrNull(
          item.CommercialNegotiationStep
        )
          ? String(item.CommercialNegotiationStep)
          : "";
        obj["IsActiveRecord"] = String(item.IsActiveRecord);
        obj["WorkflowTypeUsedFor"] = !isUndefinedOrNull(
          item.WorkflowTypeUsedForId
        )
          ? String(item.WorkflowTypeUsedForId)
          : "";
        obj["GenerateDraftTER"] = !isUndefinedOrNull(item.GenerateDraftTER)
          ? String(item.GenerateDraftTER)
          : "";
      }

      if (listName == ListNames.ProposalWorkFlowSteps) {
        obj["ProposalNumber"] = ProposalNumber;
      }

      batchItems.push(obj);
    }

    if (item.SendToBuyerForProposalCreation == "Yes")
      ifReachedProposalStep = true;
    if (listName == ListNames.PRWorkFlowSteps && ifReachedProposalStep) break;

    i++;
  }

  await serviceAPI
    .createFolderIfNotExistinList(
      context.pageContext.web.serverRelativeUrl,
      listName,
      folderName
    )
    .then((response_) => {
      consoleLogger("Finished folder creation.");
      serviceAPI
        .batchAddListItemInsideFolder(webUrl, listName, folderName, batchItems)
        .then((response) => consoleLogger("Finished flow copy."))
        .catch((error) => {
          consoleLogger("Failed folder creation.");
          AddErrorLog(
            "CommonMethods",
            listName,
            "GetFlowDataAndSave()",
            error.Message
          );
        });
    })
    .catch((error) => {
      consoleLogger("Failed folder creation.");
      AddErrorLog(
        "CommonMethods",
        listName,
        "GetFlowDataAndSave()",
        error.Message
      );
    });
};

const DeserializeProposalRemarks = (json: string) => {
  if (utility.IsStringNullorEmpty(json)) return [];
  else
    return JSON.parse(json).map(
      (i: {
        title: string;
        username: string;
        remark: string;
        financenote: string;
        date: string;
      }) => {
        if (
          !utility.IsStringNullorEmpty(i.username) &&
          !utility.IsStringNullorEmpty(i.remark)
        )
          return {
            user: { Id: 0, Title: i.title, UserName: i.username },
            remark: i.remark,
            FinanceNote: i.financenote,
            date: i.date,
          };
      }
    );
};

export const ProposalPendingWith = (item: any): User[] => {
  let users: User[] = [];

  // let AdditionApproverRemark = DeserializeProposalRemarks(
  //   item.AdditionApproverRemarks
  // );

  // if (item.IsAdditionApprover == "Yes" && item.IsAdditionCompleted == "No") {
  //   //&& all addn approver remark required
  //   let completedAddns: User[] = !utility.IsArrayNullOrZeroLength(
  //     AdditionApproverRemark
  //   )
  //     ? AdditionApproverRemark.map((i) => i.user)
  //     : [];

  //   users = item.AdditionApprover.filter(
  //     (u) => completedAddns.filter((i) => i.UserName == u.UserName).length < 0
  //   );
  // } else {
    users = item.StepApprover; // if multiple serelize remarks
  // }

  return users;
};
