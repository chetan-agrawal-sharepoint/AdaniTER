import * as React from "react";
import { IHeaderProps, IHeaderState, User } from "./IHeader";
import utility from "../../service/utility";
import serviceAPI from "../../service/serviceAPI";
import { consoleLogger } from "../CommonMethods";
const DateTime = React.lazy(() => import("./DateTime"));
require("../../styles/style.main.css");
const logo: any = require("../../images/logo.png");

export default class Header extends React.PureComponent<
  IHeaderProps,
  IHeaderState
> {
  private siteUrl: string = "";
  constructor(props: IHeaderProps, state: IHeaderState) {
    super(props);
    // this.siteUrl = this.props.context.pageContext.site.serverRelativeUrl;
    this.siteUrl = this.props.context.pageContext.web.serverRelativeUrl;
    this.state = {
      User: null,
      NavigationItems: [],
    };
    this.wrapperRef = React.createRef();
  }

  public shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    } else {
      return nextProps !== this.props;
    }
  }

  public componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    const loginName = this.props.context.pageContext.user.loginName;
    serviceAPI
      .getListItems(
        "User Information List",
        ["ID", "Title", "Picture", "EMail"],
        [],
        `EMail eq '${loginName}'`
      )
      .then((data: User[]): void => {
        this.setState({ User: data[0] });
      })
      .catch((error: any): void => {
        consoleLogger(
          "Exception: OrganizationMaster.components.header.componentDidMount().getListItems(User Information List)"
        );
        consoleLogger(error);
      });
    this.getMenus();
  }

  private getMenus = () => {
    const loginName = this.props.context.pageContext.user.loginName;
    serviceAPI
      .getListItems(
        "NavigationMenu",
        ["ID", "Title", "RoutingComponent", "RoutingURL"],
        [],
        "IsActiveRecord eq 'Yes'",
        5000,
        "Sequence",
        true
      )
      .then((data: any[]): void => {
        serviceAPI
          .getListItems(
            "NavigationSubMenu",
            ["ID", "Title", "ParentMenuId", "RoutingComponent", "RoutingURL"],
            [],
            "IsActiveRecord eq 'Yes'",
            5000,
            "Sequence",
            true
          )
          .then((subMenues: any[]) => {
            const menus = data.map((menuItem) => {
              return {
                ParentMenu: menuItem,
                ChildMenu: subMenues.filter(
                  (item) => item.ParentMenuId == menuItem.ID
                ),
              };
            });
            consoleLogger(menus);
            this.setState({ NavigationItems: menus });
          })
          .catch((error: any) => {
            consoleLogger(error);
          });
        // this.setState({ NavigationMenuItems: data });
      })
      .catch((error: any): void => {
        consoleLogger(error);
      });
  };

  public componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  private wrapperRef;
  public handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ currentMenu: null });
    }
  };

  public render(): React.ReactElement<IHeaderProps> {
    return (
      <>
        {/* <Router> */}
        <header className="header" ref={this.wrapperRef}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 logo-right-box">
                <div className="logo-content-box">
                  <a href="#" className="logo-txt">
                    <img src={logo} alt="Adani-Logo" />
                  </a>
                  {/* <p className="site-header">PR-PO Tracker</p> */}
                </div>
              </div>
              <div className="col-md-10">
                <nav>
                  <a id="resp-menu" className="responsive-menu" href="#">
                    <i className="fa fa-reorder"></i>
                  </a>
                  <ul className="menu">
                    {this.state.NavigationItems.length > 0
                      ? this.state.NavigationItems.map((navItem) => {
                          let subMenus: React.ReactElement = <></>;
                          if (navItem.ChildMenu.length > 0) {
                            subMenus = (
                              <ul
                                className={
                                  this.state.currentMenu == navItem
                                    ? "submenu"
                                    : ""
                                }
                              >
                                {navItem.ChildMenu.map((submenu: any) => {
                                  return submenu.RoutingURL == "/" &&
                                    navItem.ParentMenu.RoutingURL == "/" ? (
                                    <li>
                                      <a
                                        onClick={() =>
                                          this.setState({ currentMenu: null })
                                        }
                                        href={
                                          this.siteUrl +
                                          navItem.ParentMenu.RoutingURL
                                        }
                                      >
                                        {submenu.Title}
                                      </a>
                                      {/* <NavLink onClick={() => this.setState({ currentMenu: null })} exact={true} to={navItem.ParentMenu.RoutingURL}>{submenu.Title}</NavLink> */}
                                    </li>
                                  ) : (
                                    <li>
                                      <a
                                        onClick={() =>
                                          this.setState({ currentMenu: null })
                                        }
                                        href={this.siteUrl + submenu.RoutingURL}
                                      >
                                        {submenu.Title}
                                      </a>
                                      {/* <NavLink onClick={() => this.setState({ currentMenu: null })} to={submenu.RoutingURL}>{submenu.Title}</NavLink> */}
                                    </li>
                                  );
                                })}
                              </ul>
                            );
                          }
                          return navItem.RoutingURL == "/" ? (
                            <li>
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  this.setState({ currentMenu: navItem })
                                }
                                href={
                                  navItem.ChildMenu.length == 0 &&
                                  this.siteUrl + navItem.ParentMenu.RoutingURL
                                }
                              >
                                {navItem.ParentMenu.Title}
                                {navItem.ChildMenu.length > 0 && (
                                  <i
                                    className={
                                      this.state.currentMenu == navItem
                                        ? "fa fa-angle-down submenui"
                                        : "fa fa-angle-down"
                                    }
                                  ></i>
                                )}
                              </a>
                              {/* <NavLink onClick={() => this.setState({ currentMenu: navItem })} exact={navItem.ChildMenu.length == 0} to={navItem.ChildMenu.length == 0 && navItem.ParentMenu.RoutingURL}>{navItem.ParentMenu.Title}  {navItem.ChildMenu.length > 0 && (<i className={this.state.currentMenu == navItem ? "fa fa-angle-down submenui" : "fa fa-angle-down"}></i>)}</NavLink> */}
                              {subMenus}
                            </li>
                          ) : (
                            <li>
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  this.setState({ currentMenu: navItem })
                                }
                                href={
                                  navItem.ChildMenu.length == 0 &&
                                  this.siteUrl + navItem.ParentMenu.RoutingURL
                                }
                              >
                                {navItem.ParentMenu.Title}
                                {navItem.ChildMenu.length > 0 && (
                                  <i
                                    className={
                                      this.state.currentMenu == navItem
                                        ? "fa fa-angle-down submenui"
                                        : "fa fa-angle-down"
                                    }
                                  ></i>
                                )}
                              </a>
                              {/* <NavLink onClick={() => this.setState({ currentMenu: navItem })} to={navItem.ChildMenu.length == 0 && navItem.ParentMenu.RoutingURL}>{navItem.ParentMenu.Title}  {navItem.ChildMenu.length > 0 && (<i className={this.state.currentMenu == navItem ? "fa fa-angle-down submenui" : "fa fa-angle-down"}></i>)}</NavLink> */}
                              {subMenus}
                            </li>
                          );
                        })
                      : ""}
                    <li className="profile-bx">
                      <div className="d-flex">
                        <div className="text-right">
                          <p>{this.state.User && this.state.User.Title}</p>
                          <React.Suspense
                            fallback={<>{utility.formatDateTime()}</>}
                          >
                            <DateTime />
                          </React.Suspense>
                          <p className="pro-tracker">PR-PO Tracker</p>
                        </div>
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({ currentMenu: "profile" })
                          }
                        >
                          <i
                            className={
                              this.state.currentMenu == "profile"
                                ? "fa fa-angle-down submenui"
                                : "fa fa-angle-down"
                            }
                          ></i>
                        </a>
                        <img
                          className="profile-card"
                          src={`/_layouts/15/userphoto.aspx?size=M&amp;url=${
                            this.state.User &&
                            this.state.User.Picture &&
                            this.state.User.Picture.Url
                          }`}
                        />
                      </div>
                      <ul
                        className={
                          this.state.currentMenu == "profile"
                            ? "submenu sub-menu"
                            : "sub-menu"
                        }
                      >
                        <li>
                          <a href="#" onClick={() => utility.SignOut()}>
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
        {/* </Router> */}
      </>
    );
  }
}
