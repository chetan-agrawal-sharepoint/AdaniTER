import * as React from 'react';
import styles from './CreateTeRwp.module.scss';
import { IBuyers, IChoiceFieldInfo, ICreateTERPropsState, ICreateTERRecord, ISummaryOfScrap, IWorkFlowType, ICreateTeRwpProps, ISubFunctions } from './ICreateTeRwpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MasterPage from '../../../Common/MasterPage/MasterPage';
import SuccessErrorPopup from '../../../Common/SuccessErrorPopup/SuccessErrorPopup';
import DialogAlert from '../../../Common/DialogAlert/DialogAlert';
import { Loader } from '../../../Common/Loader/Loader';
import { DatePicker, ChoiceGroup, DefaultButton, Dropdown, IChoiceGroupOption, IconButton, IDropdownOption, TextField } from '@fluentui/react';
import ModalStructure from '../../../Common/Modal/ModalStructure';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { TabPanel, a11yProps } from '../../../Common/Tabs/Tabs';
import { AddErrorLog, consoleLogger, getUniqueNo, IsNullOrBlank, MaxTextFieldLength, ShowSucErrPopup } from '../../../Common/CommonMethods';
import serviceAPI from '../../../service/serviceAPI';
import { FileTypes, ListNames } from '../../../service/enums';
import { ILookup, IPeopleGroup } from '../../../Common/ICommonTypes';



export default class CreateTeRwp extends React.Component<ICreateTeRwpProps, ICreateTERPropsState, {}> {


  private cancelAction = () => {
    // this.setState((prevState) => ({
    //   ...prevState,
    //   selectedItem: this.InitializeState["ICreateScrapNote"],
    //   isHideDialog: true,
    //   dialogTitle: "",
    //   dialogMessage: "",
    //   isShowLineItem: false
    // }));
    window.location.reload();
  };

  private handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState(prevState => ({
      ...prevState,
      selectedTab: newValue
    }));
  }
  private InitializeState: any = {
    ICreateTERRecord: {
      ID: 0,
      ScrapProposalCode: "",
      FinancialYear: "",
      RecordNo: "",
      FormatNo: "",
      IsActiveRecord: "Yes",
      Function: null,
      Attachemnts: "",
      ReferenceTERNo: null,
      TERType: "",
      CreationDate:new Date(),
      NameofServiceEquipment:"",
      WorkCompletionDate:new Date(),

      // ReferenceTERNumber: ReferenceTERNumberOption[1],
      WorkflowType: null,
      Plant: "",
      PurchasingGroup: null,
      Buyers: [],
      Title: "",
      SubjectScrapNote: "",
      Division: null,//Dropdown
      ScrapDepartment: "",
      Reference: "",
      Storage: "",
      StorageLocation: "",
      UserCustodyat: "",
      ScrapType: "",
      ScrapItemImages: "",
      MaterialconsumptionAnalysis: "",
      FormatAAttach: "",
      Format20Attach: "",
      WDVAttachment: "",
      WDVMailAttachment: "",
      ReferenceMail_Accounts_And_Finance: "",
      TypeofScrapNote: "",
      ParentScrapReference: "",//List

      //TypeofScrap:"",
      AssetNonAsset: "",
      Frequency: "",
      TypeofScrap: "",

      //  Background and Objectives
      Background: "",
      Objective: "",
      Justification: "",
      QuantumJustification: "",
      StatutoryRequirement: "",
      FeasibilityofaltUse: "",
      DraftRemarks: "",
    },
    ISummaryOfScrap: {
      MaterialCodeAvailable: "",
      MaterialCode: "",
      ScrapCodeAvailable: "",
      ScrapCode: "",
      MaterialName: "",
      ScrapDescription: "",
      UoM: "",//DDL
      Quantitytobescrapped: "",
      WDVInventoryValue: "",
      EstimatedQuantityofScrap: "",
      RateasperlastLSO: "",
      Supportings_Images_Addt_Documents: "",
      UploadScrapDetailsExcelFile: "",
    },
    ICreateTERErrorMessage: {
      //Chetan
      ReferenceTERNumber: "",
      TERType: "",
      CreationDate: "",
      Attachemnts: "",
      WorkCompletionDate:"",

      Title: "",// StepName
      Function: "",
      FormatApplicable: "",
      WorkflowType: "",
      Plant: "",
      PurchasingGroup: "",
      Buyers: "",
      SubjectScrapNote: "",
      Division: "",//Dropdown
      ScrapDepartment: "",
      Reference: "",
      Storage: "",
      StorageLocation: "",
      UserCustodyat: "",
      ScrapType: "",
      ScrapItemImages: "",
      MaterialconsumptionAnalysis: "",
      FormatAAttach: "",
      Format20Attach: "",
      WDVAttachment: "",
      WDVMailAttachment: "",
      ReferenceMail_Accounts_And_Finance: "",
      TypeofScrapNote: "",
      ParentScrapReference: "",//List

      //TypeofScrap:"",
      AssetNonAsset: "",
      Frequency: "",
      TypeofScrap: "",

      //  Background and Objectives
      Background: "",
      Objective: "",
      Justification: "",
      QuantumJustification: "",
      StatutoryRequirement: "",
      FeasibilityofaltUse: "",
      DraftRemarks: "",
    },
  };
  constructor(props: ICreateTeRwpProps, State: ICreateTERPropsState) {
    super(props);
    const columns = [
      {
        field: "MaterialCodeAvailable",
        title: "Material Code Available",
      },
      {
        field: "MaterialCode",
        title: "Material Code",
      },
      {
        field: "ScrapCodeAvailable",
        title: "Scrap Code Available",
      },
      {
        field: "ScrapCode",
        title: "Scrap Code",
      },
      {
        field: "MaterialName",
        title: "Material Name",
      },
      {
        field: "ScrapDescription",
        title: "Scrap Description",
      },
      {
        field: "UoM",
        title: "UoM",
      },
      {
        field: "Quantitytobescrapped",
        title: "Quantity to be scrapped",
      },
      {
        field: "WDVInventoryValue",
        title: "WDV/Inventory Value",
      },
      {
        field: "EstimatedQuantityofScrap",
        title: "Estimated Quantity of Scrap",
      },
      {
        field: "RateasperlastLSO",
        title: "Rate as per last LSO",
      },

    ];
    this.state = {
      RunningNo: "0001",
      isShowDraftModal: false,
      RecordNo: "",
      FormatNo: "",
      WorkflowTypeData: [],
      FunctionData: [],
      PlantData: [],
      PurchasingGroupData: [],
      BuyerData: [],
      DivisionData: [],

      FinancialYearOptions: [],
      DepartmentData: [],
      Storage: [],
      ScrapType: [],

      //Chetan
      ReferenceTERNumberOption: [],
      TERTypeOption: [],
      CreationDate: new Date(),
      NameofServiceEquipment: "",
      EHVSubStationProject: "",
      EstimatedValue: "",
      DeliveryPeriod: "",
      ReferenceDocument: "",
      EquipmentDetails: "",
      ReferenceApprovalNoteNumberwithDate: "",
      NoofSuppliersVendors: "",
      ReferencePRNumber: "",
      WorkCompletionDate: new Date(),
      ReferenceTERNoData: [],


      //Chetan--ShowHide
      ReferenceTERNumberShow: false,
      TERTypeShow: false,
      CreationDateShow: false,
      NameofServiceEquipmentShow: false,
      WorkflowTypeShow: false,
      EHVSubStationProjectShow: false,
      EstimatedValueShow: false,
      DeliveryPeriodShow: false,
      ReferenceDocumentShow: false,
      EquipmentDetailsShow: false,
      ReferenceApprovalNoteNumberwithDateShow: false,
      NoofSuppliersVendorsShow: false,
      ReferencePRNumberShow: false,
      WorkCompletionDateShow: false,


      AssetNonAssetOptions: [],
      FrequencyOptions: [],
      TypeofScrapOptions: [],
      MaterialCodeAvailableOptions: [],
      ScrapCodeAvailableOptions: [],
      TypeofScrapNoteData: [],
      UoMOptions: [],

      selectedTab: 0,
      IsLoader: false,
      showModalLoader: false,
      allItems: [],
      listColumns: columns,
      selectedItem: this.InitializeState["ICreateTERRecord"],//ICreateScrapNote
      selectedSummaryOfScrap: this.InitializeState["ISummaryOfScrap"],
      prevRecord: this.InitializeState["ICreateTERRecord"],
      ICreateTERErrorMessage: this.InitializeState["ICreateTERErrorMessage"],

      isHideDialog: true,
      dialogTitle: "",
      dialogMessage: "",
      isAppModelShow: false,

      new_Scrap_Item_Images: true,
      new_MaterialconsumptionAnalysis: true,
      new_FormatAAttach: true,
      new_Format20Attach: true,
      new_WDVAttachment: true,
      new_WDVMailAttachment: true,
      new_ReferenceMail_Accounts_And_Finance: true,
      new_Supportings_Images_Addt_Documents: true,
    };
  }
  private getFunctionData = async () => {
    try {
      const resp: any[] = await serviceAPI.getListItems(
        ListNames.Function,
        ["ID", "Title"],
        [],
        "IsActiveRecord eq 'Yes' and ApplicableToTER eq 'Yes'",
        5000,
        "Title",
        true
      );
      consoleLogger(
        "Success: getDataFromGlobalParameterScrap().getListItems()"
      );
      consoleLogger("getDataFromGlobalParameterScrap");
      consoleLogger(resp);
      let options: ILookup[] = [];
      resp.map((item) => {
        options.push({
          ID: item.ID,
          Title: item.Title
        })
      })
      this.setState((prevState) => {
        return { ...prevState, FunctionData: options };
      });
    } catch (error) {
      consoleLogger(
        "Exception: getDataFromGlobalParameterScrap().getListItems()"
      );
      AddErrorLog("Scrap", "CreateScrapNote", "getDataFromGlobalParameterScrap", error);
    }
  }

  private getReferenceTERNo = async () => {
    let username = this.props.context.pageContext.user.loginName;
    try {
      const resp: any[] = await serviceAPI.getListItems(
        "CreateTER",
        ["ID", "Title", "AuthorisedUser/ID", "AuthorisedUser/Title", "AuthorisedUser/UserName", "TERNo"],
        ["AuthorisedUser"],
        "IsActiveRecord eq 'Yes' and AuthorisedUser/UserName eq '" + username + "'",
        5000,
        "Title",
        true
      );
      consoleLogger(
        "Success: getDataFromGlobalParameterScrap().getListItems()"
      );
      consoleLogger("getDataFromGlobalParameterScrap");
      consoleLogger(resp);
      let options: ILookup[] = [];
      resp.map((item) => {
        options.push({
          ID: item.ID,
          Title: item.Title + "-" + item.TERNo
        })
      })
      this.setState((prevState) => {
        return { ...prevState, ReferenceTERNoData: options };
      });
    } catch (error) {
      consoleLogger(
        "Exception: getDataFromGlobalParameterScrap().getListItems()"
      );
      AddErrorLog("Scrap", "CreateScrapNote", "getDataFromGlobalParameterScrap", error);
    }
  }

  private getWorkflowData = async () => {
    try {
      let username = this.props.context.pageContext.user.loginName;
      const respSubFunc: ISubFunctions[] = await serviceAPI.getListItems(
        "SubFunction",
        ["ID", "Title",
          "AuthorisedUsers/ID", "AuthorisedUsers/Title", "AuthorisedUsers/UserName"],
        ["AuthorisedUsers"],
        "IsActiveRecord eq 'Yes' and AuthorisedUsers/UserName eq '" + username + "'",
        5000
      );

      // const quertstring:string;
      let subFuncfilterString: string;
      let temp = "(SubFunction/Title eq '";
      let value: string;
      let endofstring = "')";
      let j = 1;
      for (let i = 0; i < respSubFunc.length; i++) {
        value = temp + respSubFunc[i].Title + endofstring;
        if (j > 1) {
          subFuncfilterString = subFuncfilterString + " or " + value;
        }
        else {
          subFuncfilterString = value;
          j++;
        }
      }


      const resp: IWorkFlowType[] = await serviceAPI.getListItems(
        ListNames.WorkflowTypes,
        ["ID", "Title", "WorkflowTypeUsedFor/ID", "WorkflowTypeUsedFor/Title",
          "AuthorisedUsers/ID", "AuthorisedUsers/Title", "AuthorisedUsers/UserName", "SubFunction/Title", "SubFunction/ID"],
        ["WorkflowTypeUsedFor", "AuthorisedUsers", "SubFunction"],
        "IsActiveRecord eq 'Yes' and WorkflowTypeUsedFor/Title eq 'TER' and (" + subFuncfilterString + ")",
        5000,
        "Title",
        true
      );
      consoleLogger(
        "Success: getDataFromGlobalParameterScrap().getListItems()"
      );
      // let options: IDropdownOption[] = [];
      // resp.map((item) => {
      //   options.push({
      //     key: item.ID,
      //     text: item.Title
      //   })
      // })
      this.setState((prevState) => {
        return { ...prevState, WorkflowTypeData: resp };
      });
    } catch (error) {
      consoleLogger(
        "Exception: getDataFromGlobalParameterScrap().getListItems()"
      );
      AddErrorLog("Scrap", "CreateScrapNote", "getDataFromGlobalParameterScrap", error);
    }
  }

  private checkReferencePRno = async () => {
    this.LoaderControl(true);
    try {
      const resp: any[] = await serviceAPI.getListItems(
        "CreateTER",
        ["ID", "ReferencePRNumber"],
        [],
        "IsActiveRecord eq 'Yes' and ReferencePRNumber eq '" + this.state.selectedItem.ReferencePRNumber + "'",
        1
      );
      consoleLogger(
        "Success: getDataFromGlobalParameterScrap().getListItems()"
      );
      consoleLogger("getDataFromGlobalParameterScrap");
      if (resp.length > 0) {
        this.setState(prevState => ({ ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, ["ReferencePRNumber"]: "TER is already present for the entered PR number. Please enter another PR number to continue with validation." } }));

      }


    } catch (error) {
      consoleLogger(
        "Exception: getDataFromGlobalParameterScrap().getListItems()"
      );
      AddErrorLog("Scrap", "CreateScrapNote", "getDataFromGlobalParameterScrap", error);
    }
    this.LoaderControl(false);
  }

  public async componentDidMount() {
    this.setState({ IsLoader: true });
    await Promise.all([this.getAllChFields(), this.getFunctionData(), this.getWorkflowData(), this.getReferenceTERNo()]);

    this.setState({ IsLoader: false });
  }

  private ChoiceGroupOnChange = (
    option: IChoiceGroupOption,
    fieldName: string,
    interfaceName?: string
  ) => {
    let value = option.key as string;
    if (fieldName == "TERType") {
      if (value == "Material") {
        this.setState({ NameofServiceEquipment: "Name of Equipment" });
      }
      else {
        this.setState({ NameofServiceEquipment: "Name of Service" });
      }
    }
    if (interfaceName == "selectedSummaryOfScrap") {
      this.setState((prevState) => ({
        ...prevState,
        selectedSummaryOfScrap: {
          ...prevState.selectedSummaryOfScrap,
          [fieldName]: value,
        },
        ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
      }));
    } else {
      if (fieldName == "FormatApplicable") {
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            FormatApplicable: value,
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, FormatApplicable: "" },
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            [fieldName]: value,
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
        }));
      }
    }
  };

  private DropdownOnChange = async (option: IDropdownOption, fieldName: string, interfaceName?: string) => {
    // this.setState(({ WorkflowActivity: { ...this.state.WorkflowActivity, WorkflowType: { ID: option.key as number, Title: option.text }, Function: workflowActivity.Function, SubFunction: workflowActivity.SubFunction }, WorkflowActivityErrorMessage: { ...this.state.WorkflowActivityErrorMessage, WorkflowType: '' } }));
    let value = option.key as string;

    if (fieldName == "Function") {
      this.setState({ CreationDateShow: false });
      this.setState({ ReferenceTERNumberShow: false });
      this.setState({ TERTypeShow: false });
      this.setState({ NameofServiceEquipmentShow: false });
      this.setState({ WorkflowTypeShow: false });
      this.setState({ EHVSubStationProjectShow: false });
      this.setState({ EstimatedValueShow: false });
      this.setState({ DeliveryPeriodShow: false });
      this.setState({ ReferenceDocumentShow: false });
      this.setState({ EquipmentDetailsShow: false });
      this.setState({ ReferenceApprovalNoteNumberwithDateShow: false });
      this.setState({ ReferencePRNumberShow: false });
      this.setState({ WorkCompletionDateShow: false });
    }



    if (interfaceName == "selectedSummaryOfScrap") {
      this.setState((prevState) => ({
        ...prevState,
        selectedSummaryOfScrap: {
          ...prevState.selectedSummaryOfScrap,
          [fieldName]: option.key as string,
        },
        ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
      }));
    } else {
      if (fieldName == "WorkflowType") {
        let selWF = this.state.WorkflowTypeData.filter((item) => item.ID == option.key as number);
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            WorkflowType: selWF[0],
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, WorkflowType: "" },
        }));
        //this.bindFormatApplicableOptionFromWorkflowTypes(option.key);
      }
      else if (fieldName == "PurchasingGroup") {
        let buyer: IPeopleGroup[] = [];
        this.state.PurchasingGroupData.filter((item) => {
          if (item.ID == Number(option.key)) {
            buyer = item.Buyers
          }
        })
        this.setState((prevState) => ({
          ...prevState,
          BuyerData: buyer,
          selectedItem: {
            ...prevState.selectedItem,
            PurchasingGroup: { ID: option.key as number, Title: option.text },
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, PurchasingGroup: "" },
        }));
      }
      else if (fieldName == "Buyers") {
        const authUser = {
          ID: option.key as any,
          Title: option.text,
        };
        // this.state.selectedPRAdditionalItem.Buyers = this.state.selectedPRAdditionalItem.Buyers == null ? [] : this.state.selectedPRAdditionalItem.Buyers;
        // this.state.prevPRAdditionalRecord.Buyers = this.state.prevPRAdditionalRecord.Buyers == null ? [] : this.state.prevPRAdditionalRecord.Buyers;
        // console.log(this.state.selectedPRAdditionalItem.Buyers);
        console.log(authUser);
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            Buyers: option.selected
              ? [...prevState.selectedItem.Buyers, authUser]
              : prevState.selectedItem.Buyers.filter(
                (user) => user.ID !== option.key
              ),
          },
          ICreateTERErrorMessage: {
            ...prevState.ICreateTERErrorMessage,
            Buyers: "",
          },
        }));
      }
      else if (fieldName == "Division") {
        let sel: ILookup = { ID: option.key as number, Title: option.text };
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            Division: sel,
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
        }));
        // this.getDepartmentData(option.key as string);
      }
      else if (fieldName == "Function") {
        let sel: ILookup = { ID: option.key as number, Title: option.text }
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            Function: sel,
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
        }));
      }
      else if (fieldName == "ScrapDepartment") {
        let sel: ILookup = { ID: option.key as number, Title: option.text }
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            ScrapDepartment: sel,
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
        }));
      }
      else {
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            [fieldName]: option.key as string,
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
        }));
      }
    }


    if (fieldName == "Function") {
      try {
        const respfunc: any[] = await serviceAPI.getListItems(
          ListNames.Function,
          ["ID", "Title", "TERFields"],
          [],
          "IsActiveRecord eq 'Yes' and ApplicableToTER eq 'Yes' and Title eq '" + option.text + "'", 1

        );
        consoleLogger(
          "Success: getDataFromGlobalParameterScrap().getListItems()"
        );

        let jsonfields = JSON.parse(respfunc[0].TERFields);
        if (jsonfields != null) {
          let textoptions: any[] = [];
          // Map the JSON response to the output array  
          jsonfields.map((item) => {
            textoptions.push({
              text: item.InternalName
              //Title: item.Title
            })
          });
          consoleLogger(textoptions);

          for (let i = 0; i < textoptions.length; i++) {
            if (textoptions[i].text == "CreationDate")
              this.setState({ CreationDateShow: true });
            if (textoptions[i].text == "NameofServiceEquipment")
              this.setState({ NameofServiceEquipmentShow: true });
            if (textoptions[i].text == "ReferenceTERNumber")
              this.setState({ ReferenceTERNumberShow: true });
            if (textoptions[i].text == "TERType")
              this.setState({ TERTypeShow: true });
            if (textoptions[i].text == "WorkflowType")
              this.setState({ WorkflowTypeShow: true });
            if (textoptions[i].text == "EHVSubStationProject")
              this.setState({ EHVSubStationProjectShow: true });
            if (textoptions[i].text == "EstimatedValue")
              this.setState({ EstimatedValueShow: true });
            if (textoptions[i].text == "DeliveryPeriod")
              this.setState({ DeliveryPeriodShow: true });
            if (textoptions[i].text == "ReferenceDocument")
              this.setState({ ReferenceDocumentShow: true });
            if (textoptions[i].text == "EquipmentDetails")
              this.setState({ EquipmentDetailsShow: true });
            if (textoptions[i].text == "ReferenceApprovalNoteNumberwithDate")
              this.setState({ ReferenceApprovalNoteNumberwithDateShow: true });
            if (textoptions[i].text == "NoofSuppliersVendors")
              this.setState({ NoofSuppliersVendorsShow: true });
            if (textoptions[i].text == "ReferencePRNumber")
              this.setState({ ReferencePRNumberShow: true });
            if (textoptions[i].text == "WorkCompletionDate")
              this.setState({ WorkCompletionDateShow: true });


          }
        }
        else {
          this.setState({ CreationDateShow: false });
          this.setState({ ReferenceTERNumberShow: false });
          this.setState({ TERTypeShow: false });
          this.setState({ NameofServiceEquipmentShow: false });
          this.setState({ WorkflowTypeShow: false });
          this.setState({ EHVSubStationProjectShow: false });
          this.setState({ EstimatedValueShow: false });
          this.setState({ DeliveryPeriodShow: false });
          this.setState({ ReferenceDocumentShow: false });
          this.setState({ EquipmentDetailsShow: false });
          this.setState({ ReferenceApprovalNoteNumberwithDateShow: false });
          this.setState({ ReferencePRNumberShow: false });
          this.setState({ WorkCompletionDateShow: false });

        }

      } catch (error) {
        console.log(error)
        consoleLogger(
          "Exception: getDataFromGlobalParameterScrap().getListItems()"
        );
        AddErrorLog("Scrap", "CreateScrapNote", "getDataFromGlobalParameterScrap", error);
      }
    }


  };

  private DropdownOnChangeReferenceTERNo = async (option: IDropdownOption, fieldName: string, interfaceName?: string) => {
    if (fieldName == "ReferenceTERNo") {
      let self = this.state.ReferenceTERNoData.filter((item) => item.ID == option.key as number);
      const resp: any[] = await serviceAPI.getListItems(
        "CreateTER",
        ["ID", "Title", "WorkflowType/ID,WorkflowType/Title", "ReferencePRNumber", "TERType","NameofServiceEquipment","CreationDate","EstimatedValue","DeliveryPeriod","ReferenceDocument","EquipmentDetails","ReferenceApprovalNoteNumberwithD","EHVSubStationProject","NoofSuppliersVendors","WorkCompletionDate"],
        ["WorkflowType"],
        "ID eq '" + self[0].ID + "'"
      );
      consoleLogger(resp);
      consoleLogger(new Date(resp[0].CreationDate));
     
      this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, TERType: resp[0].TERType } }));
      this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, WorkflowType : resp[0].WorkflowType } }));
      this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, ReferencePRNumber: resp[0].ReferencePRNumber } }));
      this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, NameofServiceEquipment: resp[0].NameofServiceEquipment } }));
      this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, CreationDate:new Date(resp[0].CreationDate) } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, EstimatedValue: resp[0].EstimatedValue } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, DeliveryPeriod: resp[0].DeliveryPeriod } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, ReferenceDocument: resp[0].ReferenceDocument } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, EquipmentDetails: resp[0].EquipmentDetails } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, ReferenceApprovalNoteNumberwithDate: resp[0].ReferenceApprovalNoteNumberwithD } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, EHVSubStationProject: resp[0].EHVSubStationProject } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, NoofSuppliersVendors: resp[0].NoofSuppliersVendors } }));
     this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, WorkCompletionDate: new Date(resp[0].WorkCompletionDate)} }));
 
    }
  }

  private bindFormatApplicableOptionFromWorkflowTypes = async (workflowTypeId: any) => {
    try {
      const resp: any[] = await serviceAPI.getListItems(
        ListNames.WorkflowTypes,
        ["ID", "Title", "IsBothFormatApplicable"],
        [],
        "IsActiveRecord eq 'Yes' and ID eq '" + workflowTypeId + "'",
        5000,
        "Title",
        true
      );
      consoleLogger(
        "Success: getDataFromGlobalParameterScrap().getListItems()"
      );
      consoleLogger("getDataFromGlobalParameterScrap");
      consoleLogger(resp);
      let options: IChoiceGroupOption[] = [];


      this.setState((prevState) => {
        return { ...prevState, ReferenceTERNumberOption: options };
      });
    } catch (error) {
      consoleLogger(
        "Exception: getDataFromGlobalParameterScrap().getListItems()"
      );
      AddErrorLog("Scrap", "CreateScrapNote", "getDataFromGlobalParameterScrap", error);
    }
  }
  private LoaderControl(control: boolean) {
    this.setState({ IsLoader: control });
  }
  private validateForm = (): boolean => {
    this.setState((prevState) => ({
      ICreateTERErrorMessage: this.InitializeState[
        "ICreateTERErrorMessage"
      ],
    }));
    let isValid = true;

    isValid = this.IsValid(isValid, 'ReferenceTERNumber', 'Please select Reference TER Number.', false);
    isValid = this.IsValid(isValid, 'TERType', 'Please select TER Type.', false);
    isValid = this.IsValid(isValid, 'Function', 'Please select Function.', false);
    isValid = this.IsValid(isValid, 'WorkflowType', 'Please select Workflow Type.', false);
    if (this.state.selectedItem.TERType == "Material")
      isValid = this.IsValid(isValid, 'NameofServiceEquipment', 'Please enter Name of Equipment.', false);
    else
      isValid = this.IsValid(isValid, 'NameofServiceEquipment', 'Please enter Name of Service.', false);
    isValid = this.IsValid(isValid, 'EHVSubStationProject', 'Please enter EHV Sub-Station / Project.', false);
    isValid = this.IsValid(isValid, 'EstimatedValue', 'Please enter Estimated Value', false);
    if (this.state.selectedItem.TERType == "Material")
      isValid = this.IsValid(isValid, 'DeliveryPeriod', 'Please enter Delivery Period', false);
    isValid = this.IsValid(isValid, 'ReferenceDocument', 'Please enter Reference Document', false);
    if (this.state.selectedItem.TERType == "Material")
      isValid = this.IsValid(isValid, 'EquipmentDetails', 'Please enter Equipment Details', false);
    isValid = this.IsValid(isValid, 'ReferenceApprovalNoteNumberwithDate', 'Please enter Reference Approval Note Number with Date', false);
    isValid = this.IsValid(isValid, 'NoofSuppliersVendors', 'Please enter No of Suppliers Vendors', false);
    isValid = this.IsValid(isValid, 'ReferencePRNumber', 'Please enter Reference PR Number', false);


    // isValid = this.IsValid(isValid, 'ScrapItemImages', 'Please select Scrap Item Images.', false);
    // isValid = this.IsValid(isValid, 'MaterialconsumptionAnalysis', 'Please select Material Consumption Analysis.', false);
    // if (this.state.selectedItem.FormatApplicable == FormatApplicableOption[0]) {
    //   isValid = this.IsValid(isValid, 'FormatAAttach', 'Please select FormatAAttach.', false);
    //   isValid = this.IsValid(isValid, 'Format20Attach', 'Please select Format 20 Attach.', false);
    // }
    // if (this.state.selectedItem.FormatApplicable == FormatApplicableOption[1]) {
    //   isValid = this.IsValid(isValid, 'WDVAttachment', 'Please select WDVAttachment.', false);
    //   isValid = this.IsValid(isValid, 'WDVMailAttachment', 'Please select WDVMailAttachment.', false);
    // }
    // if (this.state.selectedItem.AssetNonAsset == "Asset") {
    //   isValid = this.IsValid(isValid, 'ReferenceMail_Accounts_And_Finance', 'Please select ReferenceMail_Accounts_And_Finance.', false);
    // }
    // isValid = this.IsValid(isValid, 'WDVAttachment', 'Please select WDVAttachment.', false);



    // isValid = this.IsValid(isValid, 'EstimatedValueOfPR', 'Please enter Estimated Value Of PR in RS.', false);
    // isValid = this.IsValid(isValid, 'RequiredAtSite', 'Please select RequiredAtSite.', false);

    // Background and Objectives




    return isValid;
  };
  private IsValid = (Prev: boolean, Control: any, msg: string, isList: boolean): boolean => {
    try {
      if (isList) {
        if (this.state.selectedItem[Control] == null || this.state.selectedItem[Control].length == 0) {
          this.setState(prevState => ({ ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [Control]: msg } }));
          return false;
        }
      }
      else if (IsNullOrBlank(this.state.selectedItem[Control])) {
        this.setState(prevState => ({ ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [Control]: msg } }));
        return false;
      }
      if (!Prev) {
        return false;
      }
      return true;
    }
    catch (err) {
      console.log(Control + ' ' + err);
      return false;
    }
  };
  private validateDocument = (interfaceName?: string): boolean => {
    this.setState((prevState) => ({
      ICreateTERErrorMessage: this.InitializeState[
        "ICreateTERErrorMessage"
      ],
    }));
    let isValid = true;
    isValid = this.ValidateAllDocument(isValid, '#Attachemnts', 'Please select Attachment.');
    return isValid;
  };
  private ValidateAllDocument = (Prev: boolean, Control: any, msg: string, interfaceName?: string) => {
    let isValid = this.IsValidDocument(Control, msg, interfaceName);
    if (!Prev) {
      return false;
    }
    return isValid;
  }
  private IsValidDocument = (control: any, msg: string, interfaceName?: string): boolean => {
    try {
      let isvalid = false;
      let stName = control.replace('#', '');
      let fle = (document.querySelector(
        control
      ) as HTMLInputElement);
      if (fle != null) {
        if (fle.files.length > 0) {
          isvalid = true;
          this.setState((prevState) => ({
            ...prevState,
            ICreateTERErrorMessage: {
              ...prevState.ICreateTERErrorMessage,
              [stName]: ""
            }
          }))
        } else {
          if (interfaceName == null) {
            if (!IsNullOrBlank(this.state.prevRecord[stName])) {
              isvalid = true;
            } else {
              isvalid = false;
            }
            isvalid = this.state.selectedItem[stName] != this.state.prevRecord[stName];
          }
          this.setState((prevState) => ({
            ...prevState,
            ICreateTERErrorMessage: {
              ...prevState.ICreateTERErrorMessage,
              [stName]: msg
            }
          }))
        }
      }
      else {
        if (!IsNullOrBlank(this.state.prevRecord[stName])) {
          isvalid = true;
        } else {
          isvalid = false;
        }
        isvalid = this.state.selectedItem[stName] != this.state.prevRecord[stName];
        this.setState((prevState) => ({
          ...prevState,
          ICreateTERErrorMessage: {
            ...prevState.ICreateTERErrorMessage,
            [stName]: msg
          }
        }))
      }
      // (document.querySelector(
      //     control
      // ) as HTMLInputElement).files.length > 0 ?
      //     isvalid = true : isvalid = false;
      return isvalid;
    }
    catch (err) {
      let stName = control.replace('#', '');
      if (interfaceName == "selectedSummaryOfScrap") {
        this.setState((prevState) => ({
          ...prevState,
          selectedSummaryOfScrap: {
            ...prevState.selectedSummaryOfScrap,
            [stName]: ""
          }
        }))
      } else {
        let isvalid = false;
        isvalid = this.state.selectedItem[stName] != this.state.prevRecord[stName];
        if (!IsNullOrBlank(this.state.prevRecord[stName])) {
          isvalid = true;
        } else {
          isvalid = false;
        }
        this.setState((prevState) => ({
          ...prevState,
          selectedItem: {
            ...prevState.selectedItem,
            [stName]: ""
          }
        }))
        return isvalid;
      }
      console.log(control + ' ' + err);
      return false;
    }
  };
  private fileUploadChange = (e: any) => {
    // alert(e.target.name + "___" + e.target.id);
    let control = e.target.name;
    let FileName = e.target.files.length > 0 ? e.target.files[0].name : '';
    FileName = FileName == "" ? FileName : FileName.split('.')[FileName.split('.').length - 2] + "_" + getUniqueNo() + "." + FileName.split('.')[FileName.split('.').length - 1]
    this.setState((prevState) => ({
      ...prevState,
      selectedItem: {
        ...prevState.selectedItem,
        [control]: FileName,
      },
      ICreateTERErrorMessage: {
        ...prevState.ICreateTERErrorMessage,
        [control]: "",
      }
    }));
  }
  private SaveRecord = (str: string) => {
    try {
      this.LoaderControl(true);
      // const allowSubmit = this.validateForm();
      const allowSubmit = true;
      if (allowSubmit) {
        const isValid = this.validateDocument();
        if (isValid) {
          // this.submitItem(str);
        }
      }
      // {
      this.LoaderControl(false);
      //}
    }
    catch (ex) {
      this.LoaderControl(false);
      AddErrorLog("AdditionInfoSubmission", ListNames.ExcelProcessingListName, "SaveRecord()", ex.message);
      console.log(ex);
    }
  };

  private getAllChFields = () => {
    try {
      let data = [
        {
          "columnName": "ReferenceTERNumberPresent",
          "stateName": "ReferenceTERNumberOption",
          "type": "ChoiceGroup"
        },
        {
          "columnName": "TERType",
          "stateName": "TERTypeOption",
          "type": "ChoiceGroup"
        }

      ]
      for (var i = 0; i < data.length; i++) {
        let stName = data[i].stateName;

        serviceAPI.getChoiceField("CreateTER", data[i].columnName).then(
          (data: IChoiceFieldInfo) => {
            consoleLogger(data);
            let option: any[] = [];
            option = data.Choices.map((item) => {
              return {
                key: item,
                text: item,
              };
            });
            this.setState(prevState => ({
              ...prevState,
              [stName]: option
            }));
          },
          (error: any): void => {
            this.setState({ IsLoader: false });
            AddErrorLog("Scrap", "CreateScrapNote", "getAllChFields", error);
            consoleLogger(error);
          }
        );

      }
    }
    catch (error) {
      AddErrorLog("Scrap", "CreateScrapNote", "getAllChFields", error);
    }
  };

  public onTextFieldChange = (event: any, item: any, fieldName: string, interfaceName?: string) => {
    let TFvalue = item;
    if (TFvalue.length < MaxTextFieldLength) {
      if (interfaceName == "selectedSummaryOfScrap") {
        this.setState((prevState) => ({
          ...prevState,
          selectedSummaryOfScrap: {
            ...prevState.selectedSummaryOfScrap,
            [fieldName]: TFvalue,
          },
          ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
        }));
      } else {
        if (fieldName == "FormatApplicable") {
          this.setState((prevState) => ({
            ...prevState,
            selectedPR: TFvalue
          }));
        }
        else {
          this.setState((prevState) => ({
            ...prevState,
            selectedItem: {
              ...prevState.selectedItem,
              [fieldName]: TFvalue,
            },
            ICreateTERErrorMessage: { ...prevState.ICreateTERErrorMessage, [fieldName]: "" },
          }));
        }
      }
    }
  };

  public render(): React.ReactElement<ICreateTeRwpProps> {
    let displayComponent;
    let TERInformations;
    let Description;
    let DraftModalComponent;

    TERInformations = (
      <>
        <div className="form-container">
          <div className="form-row">
            <div className="col-12 col-sm-12">
              <div style={{ "color": "red" }}>
                Note: Please validate and check the PR number first before proceeding for of the TER. Draft of submitted TER may be present in TER Tracker.
</div>
            </div>
          </div>

          <div className="form-row">
            <div className="col-12 col-sm-4">
              <div className="form-group form-group-ddl">
                <label>
                  Function<span className="mandatory"></span>
                </label>
                <Dropdown
                  placeholder={
                    this.state.selectedItem.Function != null
                      ? ""
                      : "Select Function..."
                  }
                  options={this.state.FunctionData.map((item) => ({
                    key: item.ID,
                    text: item.Title,
                  }))}
                  className="form-control"
                  onChange={(event, option) =>
                    this.DropdownOnChange(option, "Function")
                  }
                  selectedKey={this.state.selectedItem.Function != null ? this.state.selectedItem.Function.ID : ""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.Function}
                </span>
              </div>
            </div>

            <div className="col-12 col-sm-4">
              {this.state.ReferenceTERNumberShow == true && (<div className="form-group">
                <label>
                  Reference TER Number Present<span className="mandatory"></span>
                </label>
                <ChoiceGroup
                  selectedKey={this.state.selectedItem.ReferenceTERNumber}
                  options={this.state.ReferenceTERNumberOption}
                  onChange={(event, option) =>
                    this.ChoiceGroupOnChange(option, "ReferenceTERNumber")
                  }
                  defaultSelectedKey={this.state.selectedItem.ReferenceTERNumber}
                  className="form-control inlineflex"
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.ReferenceTERNumber}
                </span>
              </div>)}
            </div>

            <div className="col-12 col-sm-4">
              {this.state.selectedItem.ReferenceTERNumber == "Yes" && (<div className="form-group form-group-ddl">
                <label>
                  Reference TER No.<span className="mandatory"></span>
                </label>
                <Dropdown
                  placeholder={
                    this.state.selectedItem.ReferenceTERNo != null
                      ? ""
                      : "Select Reference TER No..."
                  }
                  options={this.state.ReferenceTERNoData.map((item) => ({
                    key: item.ID,
                    text: item.Title,
                  }))}
                  className="form-control"
                  onChange={(event, option) =>
                    this.DropdownOnChangeReferenceTERNo(option, "ReferenceTERNo")
                  }
                // selectedKey={this.state.selectedItem.ReferenceTERNo != null ? this.state.selectedItem.ReferenceTERNo.ID : ""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.ReferenceTERNo}
                </span>
              </div>)}
            </div>


          </div>

          <div className="form-row">

            <div className="col-12 col-sm-4">
              {this.state.TERTypeShow == true && (<div className="form-group">
                <label>
                  TER Type<span className="mandatory"></span>
                </label>
                <ChoiceGroup
                  selectedKey={this.state.selectedItem.TERType}
                  options={this.state.TERTypeOption}
                  onChange={(event, option) =>
                    this.ChoiceGroupOnChange(option, "TERType")
                  }
                  defaultSelectedKey={this.state.selectedItem.TERType}
                  className="form-control inlineflex"
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.TERType}
                </span>
              </div>)}
            </div>

            <div className="col-12 col-sm-4">
              {this.state.WorkflowTypeShow == true && (<div className="form-group form-group-ddl">
                <label>Workflow Type<span className="mandatory"></span></label>
                <Dropdown
                  placeholder={
                    this.state.selectedItem.WorkflowType == null
                      ? ""
                      : "Select Workflow Type"
                  }
                  options={this.state.WorkflowTypeData.map((item) => ({
                    key: item.ID,
                    text: item.Title
                  }))}
                  className="form-control"
                  onChange={(event, option) =>
                    this.DropdownOnChange(option, "WorkflowType")
                  }
                  selectedKey={this.state.selectedItem.WorkflowType != null ? this.state.selectedItem.WorkflowType.ID : ""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.WorkflowType}
                </span>
              </div>)}
            </div>

            <div className="col-12 col-sm-4">
              {this.state.CreationDateShow == true && (<div className="form-group form-group-ddl">
                <label>Creation Date<span className=""></span></label>
                <DatePicker
                  id="creationdate"
                  value={this.state.selectedItem.CreationDate}
                  onSelectDate={date => this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, CreationDate:date } }))}
                  
                />
                <span className="">
                  {this.state.ICreateTERErrorMessage.CreationDate}
                </span>
              </div>)}
            </div>

          </div>

          <div className="form-row">

            <div className="col-12 col-sm-4">
              {this.state.NameofServiceEquipmentShow == true && (<div className="form-group form-group-ddl">
                <label>{this.state.NameofServiceEquipment}<span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.NameofServiceEquipment}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.NameofServiceEquipment}
                </span>
              </div>)}
            </div>


            <div className="col-12 col-sm-4">
              <div className="form-group form-group-ddl">
              </div>
            </div>

            <div className="col-12 col-sm-4">
              {this.state.EHVSubStationProjectShow == true && (<div className="form-group form-group-ddl">
                <label>EHV Sub-Station / Project<span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.EHVSubStationProject}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.EHVSubStationProject}
                </span>
              </div>)}
            </div>

          </div>

          <div className="form-row">
            <div className="col-12 col-sm-4">
              {this.state.EstimatedValueShow == true && (<div className="form-group form-group-ddl">
                <label>Estimated Value<span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.EstimatedValue}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.EstimatedValue}
                </span>
              </div>)}
            </div>

            <div className="col-12 col-sm-4">
            </div>
            <div className="col-12 col-sm-4">
              {this.state.DeliveryPeriodShow == true && this.state.selectedItem.TERType == "Material" && (<div className="form-group form-group-ddl">
                <label>Delivery Period<span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.DeliveryPeriod}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.DeliveryPeriod}
                </span>
              </div>)}
            </div>
          </div>

          <div className="form-row">
            <div className="col-12 col-sm-4">
              {this.state.ReferenceDocumentShow == true && (<div className="form-group form-group-ddl">
                <label>Reference Document<span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.ReferenceDocument}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.ReferenceDocument}
                </span>
              </div>)}
            </div>
            <div className="col-12 col-sm-4">
            </div>
            <div className="col-12 col-sm-4">
              {this.state.EquipmentDetailsShow == true && this.state.selectedItem.TERType == "Material" && (<div className="form-group form-group-ddl">
                <label>Equipment Details<span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.EquipmentDetails}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.EquipmentDetails}
                </span>
              </div>)}
            </div>
          </div>

          <div className="form-row">
            <div className="col-12 col-sm-4">
              {this.state.ReferenceApprovalNoteNumberwithDateShow == true && (<div className="form-group form-group-ddl">
                <label>Reference Approval Note Number with Date for Need Validation <span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.ReferenceApprovalNoteNumberwithDate}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.ReferenceApprovalNoteNumberwithDate}
                </span>
              </div>)}
            </div>

            <div className="col-12 col-sm-4">
            </div>
            <div className="col-12 col-sm-4">
              {this.state.NoofSuppliersVendorsShow == true && (<div className="form-group form-group-ddl">
                <label>No. of Suppliers / Vendors <span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.NoofSuppliersVendors}
                  /* onChange={(event, item) =>
                 this.onTextFieldChange(event, item, "Plant")*/

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.NoofSuppliersVendors}
                </span>
              </div>)}
            </div>

          </div>

          <div className="form-row">
            <div className="col-12 col-sm-4">
              {this.state.ReferencePRNumberShow == true && (<div className="form-group form-group-ddl">
                <label>Reference PR Number <span className="mandatory"></span></label>
                <TextField
                  value={this.state.selectedItem.ReferencePRNumber}
                  onChange={(event, item) =>
                    this.onTextFieldChange(event, item, "ReferencePRNumber")}

                  // readOnly={true}
                  className="form-control"
                //placeholder={""}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.ReferencePRNumber}
                </span>
              </div>)}
            </div>

            <div className="col-12 col-sm-4">
              {this.state.ReferencePRNumberShow == true && (<div className="form-group form-group-ddl">

                <br />
                <br />
                <DefaultButton
                  text="Validate"
                  className="btn  btn-primary"
                  onClick={() => this.checkReferencePRno()}
                />
                <span className="required">

                </span>
              </div>)}
            </div>

            <div className="col-12 col-sm-4">
              {this.state.WorkCompletionDateShow == true && this.state.selectedItem.TERType == "Service" && (<div className="form-group form-group-ddl">
                <label>Work Completion Date<span className=""></span></label>
                <DatePicker
                  id="workcompletiondate"
                  value={this.state.selectedItem.WorkCompletionDate}
                  onSelectDate={date => this.setState((prevState) => ({ ...prevState, selectedItem: { ...prevState.selectedItem, WorkCompletionDate:date } }))}
                />
                <span className="">
                  {this.state.ICreateTERErrorMessage.WorkCompletionDate}
                </span>
              </div>)}
            </div>

          </div>

          <div className="form-row">
            <div className="col-12 col-sm-4">
              <div className="form-group form-group-ddl">
                <label> Attachments<span className="mandatory"></span></label>
                <input
                  id="Attachemnts"
                  name="Attachemnts"
                  type="file"
                  multiple={true}
                  accept={FileTypes.Excel}
                  className="form-control"
                //  value={IsNullOrBlank(this.state.selectedItem.Attachemnts) ? "" : this.state.selectedItem.Attachemnts}
                //  onChange={(event) => {
                //    let files = event.target.files;
                //    this.setState((prevState) => ({
                //     ...prevState,
                ///       selectedItem: {
                //         ...prevState.selectedItem,
                //         ScrapItemImages: files
                //       }
                //     }))
                //   }}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.Attachemnts}
                </span>
              </div>
            </div>
          </div>


          <div className="form-row">
            <div className="col-12 col-sm-4">
              <DefaultButton
                text="Submit"
                className="btn btn-secondary"
                onClick={() => this.SaveRecord("")}
              />
            </div>
          </div>
        </div>

      </>
    );

    displayComponent = (
      <div className="container">
        {/* <div className="page-heading-container">
          <h1 className="sub-head-fixed">My PRs</h1>
        </div> */}
        <ModalStructure
          isModalOpen={!this.state.isShowDraftModal}
          modalTitle={"View Log Details"}
          modalBody={DraftModalComponent}
          cancelAction={() => this.cancelAction()}
          // showHeader={true}
          customModalClass="transactionLogClass"
        ></ModalStructure>
        <div className="page-heading-container">
          <h1 className="sub-head-fixed">Scrap Note</h1>
          <div className="filterFormAllProposal task-group">
            <div className="task-group-form">
              <div className="col-6 col-sm-4 mb-3 task-group-select">
                <Dropdown
                  placeholder="Financial Year"
                  className="form-control"
                  options={this.state.FinancialYearOptions}
                  onChange={(
                    event: React.FormEvent<HTMLDivElement>,
                    option?: IDropdownOption,
                    index?: number
                  ) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      selectedItem: {
                        ...prevState.selectedItem,
                        FinancialYear: option.key as string,
                      }
                    }))
                  }
                  selectedKey={IsNullOrBlank(this.state.selectedItem.FinancialYear)
                    ? "" : Number(this.state.selectedItem.FinancialYear)}
                  defaultSelectedKey={IsNullOrBlank(this.state.selectedItem.FinancialYear)
                    ? "" : Number(this.state.selectedItem.FinancialYear)}
                />
                <span className="required">
                  {this.state.ICreateTERErrorMessage.FinancialYear}
                </span>
              </div>
              <div className="col-6 col-sm-4 mb-3">
                <label className="label">Record No. </label>
                <label className="label">{this.state.RecordNo}</label>
                <br></br>
                <label className="label">Format No. </label>
                <label className="label">{this.state.FormatNo}</label>
              </div>
              {/* <div className="col-6 col-sm-4 mb-3 task-group-select task-group-btn">
                <PrimaryButton
                  text="Go"
                  className="btn btn-primary"
                  onClick={() => this.buyerMatchWithPR()}
                />

              </div> */}
            </div>
          </div>
        </div>
        <div className="row tab-header-wrapper">
          <div className="col-12 col-sm-6 tabs-wrapper">
            <Paper square>
              <Tabs
                value={this.state.selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleTabChange}
              //aria-label="disabled tabs example"
              >
                <Tab label="TER Informations" {...a11yProps(0)} />
                <Tab label="Description" {...a11yProps(1)} />
                <Tab label="Recommendation" {...a11yProps(2)} />
              </Tabs>
            </Paper>
          </div>
          <div className="col-12 col-sm-6 selecttype-btn-wrapper">

          </div>
        </div>
        <TabPanel value={this.state.selectedTab} index={0}>
          {TERInformations}
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          {Description}
        </TabPanel>

      </div>
    );
    return (
      <MasterPage context={this.props.context} >
        <section className="main-container pending-info-page">
          {this.state.SuccessErrorPopup && (
            <SuccessErrorPopup
              showPopup={this.state.SuccessErrorPopup.showPopup}
              Title={this.state.SuccessErrorPopup.Title}
              Message={this.state.SuccessErrorPopup.Message}
              OkFunction={this.state.SuccessErrorPopup.OkFunction}
              action={this.state.SuccessErrorPopup.action}
            ></SuccessErrorPopup>
          )}
          <DialogAlert
            isHideDialog={this.state.isHideDialog}
            dialogMessage={this.state.dialogMessage}
            dialogTitle={this.state.dialogTitle}
            cancelAction={() => this.cancelAction()}
            confirmAction={() => () => { }}
          />
          <Loader isLoaderActive={this.state.IsLoader} />
          {displayComponent}
          <div className="two-col-partition-container">
            <div className="btn-form-box">
              {/* <DefaultButton
              text="Validate Background and Objective Details"
              className="btn btn-secondary"
              onClick={() => this.validateForm()}
            /> */}

              {/*  <DefaultButton
              text="Save as Draft"
              className="btn btn-secondary"
              onClick={() => this.OpenDraftSaveModal()}
            />
            <DefaultButton
              text="Submit"
              className="btn btn-secondary"
              onClick={() => this.SaveRecord("")}
            />
            <DefaultButton
              text="Cancel"
              className="btn  btn-primary"
              onClick={() => this.cancelAction()}
            />*/}
            </div>
          </div>
          {/* <ModalStructure
            isModalOpen={!this.state.isAppModelShow}
            modalTitle="PR Tracker"
            modalBody={ApprovalModelComponent}
            cancelAction={() => this.cancelAction()}
            showLoader={this.state.showModalLoader}
          ></ModalStructure> */}
        </section>
      </MasterPage>
    );
  }
}
