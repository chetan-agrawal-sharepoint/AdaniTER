import * as React from "react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

export interface ILoaderProps {
  isLoaderActive: boolean;
  LoaderMessage?: string;
}

export class Loader extends React.Component<ILoaderProps, {}> {
  public render(): React.ReactElement<ILoaderProps> {
    return (
      <>
        {this.props.isLoaderActive && (
          <div className="Loader">
            <Spinner size={SpinnerSize.large} className="Loader-Position" />
            {this.props.LoaderMessage && (
              <Spinner label={this.props.LoaderMessage} />
            )}
          </div>
        )}
      </>
    );
  }
}
