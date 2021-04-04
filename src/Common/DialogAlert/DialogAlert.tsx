import * as React from "react";
import { IModalProps } from "office-ui-fabric-react/lib/Modal";
import Dialog, {
  DialogFooter,
  DialogType,
} from "office-ui-fabric-react/lib/Dialog";
import { DefaultButton } from "@fluentui/react/lib/Button";

export interface IDialogAlertProps {
  isHideDialog: boolean;
  dialogMessage: any;
  dialogTitle: string;
  cancelAction?: Function;
  confirmAction: Function;
}

export default function DialogAlert(props: IDialogAlertProps) {
  const dialogProps = {
    type: DialogType.normal,
    title: props.dialogTitle,
    showCloseButton: false,
  };
  const modalProps: IModalProps = {
    isBlocking: true,
    isDarkOverlay: true,
  };

  const cancel = () => {
    if (props.cancelAction != null) props.cancelAction();
  };

  const onConfirmAction = () => {
    props.confirmAction();
  };

  return (
    <Dialog
      dialogContentProps={dialogProps}
      modalProps={modalProps}
      hidden={props.isHideDialog}
    >
      {props.dialogMessage}
      <DialogFooter>
        {props.cancelAction != null && (
          <DefaultButton
            className="btn btn-secondary"
            onClick={() => cancel()}
            text="Cancel"
          />
        )}
        <DefaultButton
          className="btn btn-primary"
          onClick={() => onConfirmAction()}
          text="OK"
        />
      </DialogFooter>
    </Dialog>
  );
}
