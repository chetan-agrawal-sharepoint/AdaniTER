import * as React from "react";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import Header from "../header/Header";
import { Footer } from "../footer/Footer";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
require("../../styles/style.main.css");

export interface IMasterPageProps {
  context: WebPartContext;
  children: any;
}

export interface IMasterPageState {}

export default class MasterPage extends React.Component<
  IMasterPageProps,
  IMasterPageState
> {
  constructor(props: IMasterPageProps, state: IMasterPageState) {
    super(props);
    SPComponentLoader.loadCss(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    );
    SPComponentLoader.loadCss(
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    );
    SPComponentLoader.loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"
    ).then(($: any) => {
      require("../../scripts/custom.js");
    });
  }

  public render(): React.ReactElement<IMasterPageProps> {
    return (
      <>
        <Header context={this.props.context} />
        <ErrorBoundary context={this.props.context}>
          {this.props.children}
        </ErrorBoundary>
        <Footer />
      </>
    );
  }
}
