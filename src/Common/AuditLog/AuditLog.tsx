import * as React from "react";
import serviceAPI from "../../service/serviceAPI";
import { ListNames } from "../../service/enums";
import { AddErrorLog, consoleLogger } from "../CommonMethods";
import TableComponent from "../TableComponent/TableComponent";
import { Loader } from "../Loader/Loader";
import * as moment from "moment";

export interface IAuditLogProps {
  ProposalNo?: string;
}

export interface IAuditLogState {
  IsLoader: boolean;
  allItems: IAuditLogRecord[];
}

export interface IAuditLogRecord {
  Id: string;
  Title: string;
  Action: string;
  Remarks: string;
  Created: string;
}

const AuditLog: React.FC<IAuditLogProps> = (
  props: React.PropsWithChildren<IAuditLogProps>
) => {
  const columns = [
    {
      field: "Action",
      title: "Action Taken",
    },
    {
      field: "Created",
      title: "Date",
      render: (rowdata) => moment(rowdata.Created).format("DD/MM/YYYY"),
    },
    {
      field: "Created",
      title: "Time",
      render: (rowdata) => moment(rowdata.Created).format("HH:mm:ss"),
    },
  ];

  const [state, setState] = React.useState<IAuditLogState>({
    IsLoader: false,
    allItems: [],
  });

  const LoaderControl = (control: boolean) => {
    setState((prevState) => {
      return { ...prevState, IsLoader: control };
    });
  };

  const getAuditLog = async (ProposalNo: string) => {
    LoaderControl(true);
    try {
      const data = await serviceAPI.getLargeListItems(
        ListNames.AuditLog,
        ["Id", "Title", "Action", "Remarks", "Created"],
        [],
        `Title eq '${ProposalNo}'`,
        1
      );
      consoleLogger("Success: getAuditLog().getListItems()");
      setState((prevState: IAuditLogState) => {
        return { ...prevState, allItems: data };
      });
    } catch (error) {
      AddErrorLog("PR", "AuditLog", "getAuditLog()", error);
      consoleLogger(error);
    }
    LoaderControl(false);
  };

  React.useEffect(() => {
    LoaderControl(true);
    getAuditLog(props.ProposalNo);
    LoaderControl(false);
  }, []);

  return (
    <>
      <Loader isLoaderActive={state.IsLoader} />
      {/* <div className="dialog-sub-title">Audit Log</div> */}
      <div className="form-row">
        <div className="popup-table-container">
          <TableComponent
            allItems={state.allItems}
            listColumns={columns}
            tableKey="AuditLog"
            tableTitle="AuditLog"
          ></TableComponent>
        </div>
      </div>
    </>
  );
};

export default AuditLog;
