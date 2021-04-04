import * as React from "react";
import serviceAPI from "../../service/serviceAPI";
import {
  AddErrorLog,
  consoleLogger,
  IsNullOrBlank,
} from "../../Common/CommonMethods";
import TableComponent from "../../Common/TableComponent/TableComponent";
import { Loader } from "../../Common/Loader/Loader";
import * as moment from "moment";
import { DateTimeEnum, ListNames } from "../../service/enums";

export interface ITransactionLogProps {
  PrNo?: string;
  ProposalNo?: string;
  cancelAction?: Function;
}

export interface ITransactionLogState {
  IsLoader: boolean;
  allItems: ITransactionLogRecord[];
}

export interface ITransactionLogRecord {
  ID: string;
  Title: string;
  PRNo: string;
  Remarks: string;
  Created: string;
}

export class TransactionLog extends React.Component<
  ITransactionLogProps,
  ITransactionLogState
> {
  private columns = [
    {
      field: "Title",
      title: "Action Taken",
    },
    {
      field: "Created",
      title: "Date",
      render: (rowdata) =>
        IsNullOrBlank(rowdata.Created)
          ? ""
          : new Date(rowdata.Created).toLocaleDateString(
              DateTimeEnum.dateLocale
            ),
    },
    {
      field: "Created",
      title: "Time",
      render: (rowdata) =>
        IsNullOrBlank(rowdata.Created)
          ? ""
          : new Date(rowdata.Created).toLocaleTimeString(
              DateTimeEnum.dateLocale
            ),
    },
  ];

  public state: ITransactionLogState = {
    IsLoader: false,
    allItems: [],
  };

  public componentDidMount() {
    this.getTransactionLog(this.props.PrNo);
  }

  private getTransactionLog = (PrNo: string) => {
    this.setState({ IsLoader: true });
    serviceAPI
      .getLargeListItems(
        ListNames.TransactionLog,
        ["ID", "Title", "PRNo", "Remarks", "Created"],
        [],
        `PRNo eq '${PrNo}'`,
        1
      )
      .then(
        (data: ITransactionLogRecord[]): void => {
          consoleLogger("Success: getTransactionLog().getListItems()");
          this.setState({
            allItems: data,
            IsLoader: false,
          });
        },
        (error: any): void => {
          this.setState({ IsLoader: false });
          AddErrorLog(
            "TransactionLog",
            "TransactionLog",
            "getTransactionLog()",
            error
          );
          consoleLogger(error);
        }
      );
  };

  public render(): React.ReactElement<ITransactionLogProps> {
    return (
      <>
        <Loader isLoaderActive={this.state.IsLoader} />
        <div className="form-row">
          <div className="popup-table-container">
            <TableComponent
              allItems={this.state.allItems}
              listColumns={this.columns}
              tableKey="TransactionLog"
              tableTitle="TransactionLog"
            ></TableComponent>
          </div>
        </div>
      </>
    );
  }
}
