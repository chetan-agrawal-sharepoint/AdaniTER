import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHeaderProps {
  context: WebPartContext;
}

export interface IHeaderState {
  User: User;
  currentMenu?: any;
  NavigationItems: any[];
}

export interface User {
  Title: string;
  Picture: { Url: string };
}
