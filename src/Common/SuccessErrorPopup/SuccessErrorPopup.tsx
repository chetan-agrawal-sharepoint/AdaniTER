import * as React from "react";
import { getTheme, mergeStyleSets } from "office-ui-fabric-react";
import {
  Dialog,
  DialogType,
  DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ISuccessErrorPopupProp } from "./ISuccessErrorPopup";

const dialogStyles = { main: { maxWidth: 450 } };

const theme = getTheme();
const contentStyles = {
  add: mergeStyleSets({
    header: {
      borderTop: `4px solid ${theme.palette.themeDark}`,
    },
  }),
  update: mergeStyleSets({
    header: {
      borderTop: `4px solid ${theme.palette.themePrimary}`,
    },
  }),
  delete: mergeStyleSets({
    header: {
      borderTop: `4px solid ${theme.palette.red}`,
    },
  }),
  error: mergeStyleSets({
    header: {
      borderTop: `4px solid ${theme.palette.red}`,
    },
  }),
};

const modalProps = {
  isBlocking: true,
  styles: dialogStyles,
  isDarkOverlay: false,
};

const renderSwitch = (param) => {
  switch (param) {
    case "add":
      return contentStyles.add.header;
    case "update":
      return contentStyles.update.header;
    case "delete":
      return contentStyles.delete.header;
    case "error":
      return contentStyles.error.header;
    default:
      return contentStyles.add.header;
  }
};

export default function SuccessErrorPopup(props: ISuccessErrorPopupProp) {
  const dialogContentProps = {
    type: DialogType.normal,
    title: props.Title,
    subText: props.Message,
  };

  return (
    <Dialog
      hidden={!props.showPopup}
      onDismiss={() => props.OkFunction()}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
      containerClassName={renderSwitch(props.action)}
    >
      <DialogFooter>
        <DefaultButton
          text="OK"
          className="btn btn-primary"
          onClick={() => {
            if (props.OkFunction) props.OkFunction();
          }}
        />
      </DialogFooter>
    </Dialog>
  );
}
