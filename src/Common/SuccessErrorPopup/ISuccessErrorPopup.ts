export interface ISuccessErrorPopupProp {
  showPopup: boolean;
  Title: string;
  Message: string;
  OkFunction?: Function;
  action: string;
}
export interface ISuccessErrorPopupState {
  isModalOpen: boolean;
}
