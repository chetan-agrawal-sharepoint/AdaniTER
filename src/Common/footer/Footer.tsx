import * as React from "react";

export interface IFooterProps {}

export const Footer: React.FunctionComponent<IFooterProps> = (
  props: React.PropsWithChildren<IFooterProps>
) => {
  return (
    <footer>
      <div className="copyright">
        Copyright &copy; {new Date().getFullYear()} by Adani. All rights
        reserved.
      </div>
    </footer>
  );
};
