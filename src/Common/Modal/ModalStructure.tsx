import * as React from "react";
import { useId } from "@uifabric/react-hooks";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IconButton,
  IIconProps,
} from "office-ui-fabric-react";
import { ModalSize } from "../../service/enums";
import { Loader } from "../Loader/Loader";
import utility from "../../service/utility";

export interface IModal {
  isModalOpen: boolean;
  modalTitle: string;
  modalBody: any;
  modalHeader?: string;
  modalSize?: ModalSize;
  cancelAction?: Function;
  showLoader?: boolean;
  showHeader?: boolean; //depreciated
  customModalClass?: string;
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 0px 0px",
    backgroundColor: "transparent",
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      backgroundColor: "skyblue",
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    //padding: "0 12px 12px 12px",
    maxWidth: "1200px",
    minWidth: "400px",
    maxHeight: "80vh",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
  VerySmallModal: {
    width: "400px",
  },
  SmallModal: {
    width: "600px",
  },
  MediumModal: {
    width: "800px",
  },
  LargeModal: {
    width: "1200px",
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
    float: "right",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const cancelIcon: IIconProps = { iconName: "Cancel" };
export default function ModalStructure(props: IModal) {
  const titleId = useId(props.modalTitle);
  return (
    <Modal
      titleAriaId={titleId}
      isOpen={!props.isModalOpen}
      onDismiss={() => props.cancelAction()}
      isBlocking={true}
      containerClassName={`${contentStyles.container} ${
        props.customModalClass ? props.customModalClass : ""
      }`}
    >
      {props.showHeader != null && props.showHeader == true && (
        <div className={contentStyles.header}>
          <span id={titleId}>{props.modalTitle}</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={() => props.cancelAction()}
          />
        </div>
      )}
      <div
        className={`${contentStyles.body} form-container ${
          props.modalSize == ModalSize.VerySmall
            ? contentStyles.VerySmallModal
            : props.modalSize == ModalSize.Small
            ? contentStyles.SmallModal
            : props.modalSize == ModalSize.Medium
            ? contentStyles.MediumModal
            : props.modalSize == ModalSize.Large
            ? contentStyles.LargeModal
            : ""
        }`}
      >
        <div
          style={{
            display: "-webkit-box",
            WebkitBoxAlign: "baseline",
          }}
        >
          <h1 className="sub-head-fixed marginBottom30">
            {!utility.IsStringNullorEmpty(props.modalHeader)
              ? props.modalHeader
              : ""}
          </h1>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={() => props.cancelAction()}
          />
        </div>

        {props.modalBody}
      </div>
      <Loader
        isLoaderActive={props.showLoader != null ? props.showLoader : false}
      />
    </Modal>
  );
}
