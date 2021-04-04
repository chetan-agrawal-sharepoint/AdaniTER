import * as React from "react";
import styles from "./TableComponent.module.scss";

import MaterialTable, { MTableBodyRow } from "material-table";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { forwardRef } from "react";
import { CsvBuilder } from "filefy";
import utility from "../../service/utility";

import { PRStatus } from "../../service/enums";

const tableIcons = {
  Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <AddBox {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Edit {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Search {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ArrowUpward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ViewColumn {...props} ref={ref} />
  )),
};

interface ITableComponentProps {
  allItems: any[];
  listColumns: any[];
  tableTitle?: string;
  tableKey: string;
  title?: any;
  Delete?: Function;
  Edit?: Function;
  pageSize?: number;
  IsPagination?: boolean;
  ExportCSV?: any;
  TableSearch?: boolean;
  IsTableGroupBy?: boolean;
  selection?: boolean;
  onSelectionChangeFunction?: Function;
  additionalActions?: any[];
  rowUpdateFunction?: any;
  rowAddFunction?: any;
  rowDeleteFunction?: any;
  isRowEditable?: any;
  isRowEditHidden?: any;
  isRowDeletable?: any;
  isRowDeleteHidden?: any;
  RowStyleFunction?: any;
  onRowClick?: any;
  EditDisableFun?: any;
  tableStyles?: any;
}

interface ITableComponentState {
  data: any[];
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
  },
});

const tableStyle = {
  backgroundColor: "#f0f4f7",
  boxShadow: "none",
};

export default class TableComponent extends React.Component<
  ITableComponentProps,
  ITableComponentState
> {
  public state: ITableComponentState = { data: [] };

  private exportCsv = (columnList, initialData) => {
    const columns = columnList.filter((columnDef) => {
      return !columnDef.hidden && columnDef.field && columnDef.export !== false;
    });

    const data = initialData.map((rowData) =>
      columns.map((columnDef) => {
        if (this.props.IsTableGroupBy == true) {
          return columnDef.render
            ? columnDef.render(rowData)
            : rowData[columnDef.field];
        } else {
          return columnDef.render
            ? columnDef.render(rowData).props.children
            : rowData[columnDef.field];
        }
      })
    );

    const builder = new CsvBuilder(
      this.props.tableTitle
        ? this.props.tableTitle + ".csv"
        : "New File" + ".csv"
    );
    builder
      .setDelimeter(",")
      .setColumns(columns.map((columnDef) => columnDef.title))
      .addRows(data)
      .exportFile();
  };

  private tableOptions = {
    draggable: false,
    toolbar:
      this.props.TableSearch ||
      this.props.ExportCSV ||
      this.props.rowAddFunction
        ? true
        : false,
    showTitle: false,
    search: this.props.TableSearch ? this.props.TableSearch : false,
    exportButton: this.props.ExportCSV ? this.props.ExportCSV : false,
    exportAllData: true,
    exportFileName: this.props.tableTitle ? this.props.tableTitle : "New File",
    exportCsv: this.exportCsv,
    sorting: true,
    // actionsColumnIndex: -1,
    headerStyle: {
      backgroundColor: "#146db7",
      color: "white",
      paddingRight: "16px",
    },
    paging: this.props.IsPagination === false ? this.props.IsPagination : true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    emptyRowsWhenPaging: false,
    selection: true,
    showTextRowsSelected: false,
    showSelectAllCheckbox: false,
    selectionProps: (rowData) => ({
      disabled: rowData.selectable ? !rowData.selectable : false,
      // checked: rowData.checked ? rowData.checked : false,
    }),
    rowStyle: this.props.RowStyleFunction
      ? this.props.RowStyleFunction
      : (rowData) => {
          return {};
        },
    onRowClick: this.props.onRowClick
      ? this.props.onRowClick
      : (rowData) => {
          return {};
        },
  };

  public componentDidMount() {
    this.setState({ data: this.props.allItems });
  }

  public componentWillReceiveProps(nextProps: ITableComponentProps) {
    if (nextProps.allItems !== this.state.data) {
      this.setState({ data: nextProps.allItems });

      if (this.props.selection)
        this.state.data.forEach((d) => {
          if (d.tableData) d.tableData.checked = false;
        });
    }
  }

  public render(): React.ReactElement<ITableComponentProps> {
    if (this.props.selection == null) this.tableOptions.selection = false;
    else if (this.props.selection != null && !this.props.selection)
      this.tableOptions.selection = false;
    else if (this.props.selection != null && this.props.selection) {
      this.tableOptions.selection = true;
    }
    if (this.props.title) this.tableOptions.showTitle = true;
    if (this.props.pageSize) this.tableOptions.pageSize = this.props.pageSize;
    this.tableOptions.paging =
      this.props.IsPagination === false
        ? false
        : this.props.allItems.length < this.tableOptions.pageSize
        ? false
        : true;

    let actions = [];
    this.props.Edit &&
      actions.push(
        //(rowData_) => (
        {
          name: "Edit",
          icon: () => <EditIcon className={styles.editIconClass}></EditIcon>,
          tooltip: "Edit",
          position: "row",
          onClick: (event, rowData) => this.props.Edit(rowData),
          hidden: this.props.Edit == null,
          // disabled:(rowData) => this.props.EditDisableFun(rowData)
        }
        //)
      );
    this.props.Delete &&
      actions.push(
        //(rowData_) => (
        {
          name: "Delete",
          icon: () => (
            <DeleteIcon className={styles.deleteIconClass}></DeleteIcon>
          ),
          tooltip: "Delete",
          position: "row",
          onClick: (event, rowData) => this.props.Delete(rowData),
          //hidden: this.props.Delete == null || rowData_.IsActiveRecord != "Yes",
        }
        //)
      );
    if (this.props.additionalActions)
      actions.push(...this.props.additionalActions);

    //#region Workaround for issue "Selection and Actions in the same Table Row".
    // See https://github.com/mbrn/material-table/issues/676
    let components = {
      Row: (props) => {
        const propsCopy = { ...props };
        let _delete = propsCopy.actions.find((a) => a.name === "Delete");
        let _DeallocateBuyers = propsCopy.actions.find(
          (a) => a.name === "DeallocateBuyers"
        );
        let _SavePR = propsCopy.actions.find((a) => a.name === "SavePR");
        let _ReverttoIndenter = propsCopy.actions.find(
          (a) => a.name === "ReverttoIndenter"
        );
        let _ViewPR = propsCopy.actions.find((a) => a.name === "ViewPR");

        if (_delete) _delete.hidden = propsCopy.data.IsActiveRecord != "Yes";

        if (_DeallocateBuyers)
          _DeallocateBuyers.hidden = utility.IsArrayNullOrZeroLength(
            propsCopy.data.Buyers
          );
        //  || propsCopy.data.PendingAt == null ||
        // [
        //   PRStatus.PendingForBuyerAction,
        //   PRStatus.UnderApprovalProcess,
        // ].indexOf(propsCopy.data.PendingAt) < 0;

        if (_SavePR)
          _SavePR.hidden = utility.IsArrayNullOrZeroLength(
            propsCopy.data.Buyers
          );

        if (_ReverttoIndenter)
          _ReverttoIndenter.hidden =
            propsCopy.data.CRT_Indicator && propsCopy.data.CRT_Indicator == "B";

        if (_ViewPR)
          _ViewPR.hidden =
            propsCopy.data.CRT_Indicator && propsCopy.data.CRT_Indicator == "B";

        return <MTableBodyRow {...propsCopy} />;
      },
    };
    //#endregion

    let editableProp: any = {};
    if (this.props.rowUpdateFunction)
      editableProp.onRowUpdate = this.props.rowUpdateFunction;
    if (this.props.rowAddFunction)
      editableProp.onRowAdd = this.props.rowAddFunction;
    if (this.props.rowDeleteFunction)
      editableProp.onRowDelete = this.props.rowDeleteFunction;
    if (this.props.isRowEditable)
      editableProp.isEditable = this.props.isRowEditable;
    if (this.props.isRowEditHidden)
      editableProp.isEditHidden = this.props.isRowEditHidden;
    if (this.props.isRowDeletable)
      editableProp.isDeletable = this.props.isRowDeletable;
    if (this.props.isRowDeleteHidden)
      editableProp.isDeleteHidden = this.props.isRowDeleteHidden;

    return (
      <div className={styles.tableStyles}>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            components={components}
            title={this.props.title ? this.props.title : ""}
            columns={this.props.listColumns}
            data={this.state.data}
            options={this.tableOptions}
            actions={actions}
            icons={tableIcons}
            style={this.props.tableStyles ? this.props.tableStyles : tableStyle}
            onSelectionChange={(rows) => {
              if (this.props.onSelectionChangeFunction)
                this.props.onSelectionChangeFunction(rows);
            }}
            editable={editableProp}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
