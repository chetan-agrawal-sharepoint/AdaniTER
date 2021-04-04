import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CreateTeRwpWebPartStrings';
import CreateTeRwp from './components/CreateTeRwp';
import { ICreateTeRwpProps } from './components/ICreateTeRwpProps';
import { sp } from "@pnp/sp";

export interface ICreateTeRwpWebPartProps {
  description: string;
  
}

export default class CreateTeRwpWebPart extends BaseClientSideWebPart<ICreateTeRwpWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ICreateTeRwpProps> = React.createElement(
      CreateTeRwp,
      {
        //description: this.properties.description
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

 

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
