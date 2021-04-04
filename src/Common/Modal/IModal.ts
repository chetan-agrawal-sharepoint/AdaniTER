export interface IModal {
  isModalOpen: boolean;
  modalTitle: string;
  modalBody: any;
  cancelAction: Function;
  showLoader?: boolean;
  showHeader?: boolean;
  customModalClass?: string;
}
