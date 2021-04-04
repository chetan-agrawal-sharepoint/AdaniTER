import * as React from "react";
import { AddErrorLog } from "../CommonMethods";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import ModalStructure from "../Modal/ModalStructure";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { consoleLogger } from "../CommonMethods";
import { ModalSize } from "../../service/enums";

interface IErrorBoundaryProps {
  context: WebPartContext;
}

interface IErrorBoundaryState {
  hasError: boolean;
  isHideDialog: boolean;
}

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = { hasError: false, isHideDialog: false };

  public static getDerivedStateFromError(error) {
    consoleLogger(`Errorboundary error----> ${error}`);
    return { hasError: true, isHideDialog: true };
  }

  public componentDidCatch(error, errorInfo) {
    AddErrorLog("PRPO Application", "", "Application Loading", error);
  }

  private goBack = () => {
    this.setState({
      isHideDialog: false,
    });
    window.location.reload();
  };

  private goToHomepage = () => {
    this.setState({
      isHideDialog: false,
    });
    window.location.replace(this.props.context.pageContext.web.absoluteUrl);
  };

  public render() {
    let form = (
      <div className="form-row">
        <div className="col-12 col-sm-12">
          <Typography variant="body2" component="p">
            Please contact administrator.
          </Typography>
        </div>

        <div className="two-col-partition-container">
          <div className="btn-form-box">
            <Button size="small" onClick={() => this.goToHomepage()}>
              HomePage
            </Button>
            <Button size="small" onClick={() => this.goBack()}>
              Back
            </Button>
          </div>
        </div>
      </div>
    );
    if (this.state.hasError) {
      return (
        <div>
          <ModalStructure
            isModalOpen={!this.state.isHideDialog}
            modalTitle="Something went wrong!"
            modalBody={form}
            modalHeader="Something went wrong!"
            modalSize={ModalSize.VerySmall}
            cancelAction={() => this.goBack()}
          ></ModalStructure>
        </div>
      );
    }
    return this.props.children;
  }
}
