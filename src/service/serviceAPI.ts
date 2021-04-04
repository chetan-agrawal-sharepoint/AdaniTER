import { sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { getGUID } from "@pnp/common";
import { ICamlQuery, IListItemFormUpdateValue } from "@pnp/sp/lists";
import { IBatchUpdateReq } from "../Common/ICommonTypes";
import { consoleLogger } from "../Common/CommonMethods";
import { ListNames } from "./enums";

export default class serviceAPI {
  private static createCamlQuery(viewField: any[], filter: any[]) {
    let vf = "<ViewFields>";
    viewField.map((item) => {
      vf += "<FieldRef Name='" + item + "' />";
    })
    vf += "</ViewFields>";
    let fil = "<Query><Where><Eq><FieldRef Name='EndDate'/><Value Type='DateTime'><Today /></Value></Eq></Where></View></Query>";
    filter.map((item) => {
      fil += "<FieldRef Name='" + item + "' />";
    })
    fil += "</ViewFields>";
    const caml: ICamlQuery = {
      ViewXml: "<View><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>5</RowLimit></View>",
    };

  }
  public static getListItemsUsingCamlQuery(
    listName: string,
    camlquery: string,
    selectedColumns?: string[],
    expandColumns?: string[],
    filterCondition?: string,
    topMax?: number,
    sortingColumn?: string,
    sortingOrder?: boolean,

  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject): void => {
      let listItems: any;
      // if (listName.indexOf("User Information List") > -1)
      //   listItems = sp.site.rootWeb.lists.getByTitle(listName);
      // else listItems = sp.web.lists.getByTitle(listName);
      // if (selectedColumns != undefined && selectedColumns.length > 0)
      //   listItems = listItems.select(selectedColumns.toString());
      // if (expandColumns != undefined && expandColumns.length > 0)
      //   listItems = listItems.expand(expandColumns.toString());
      // if (filterCondition != undefined && filterCondition.length > 0)
      //   listItems = listItems.filter(filterCondition);
      // if (topMax != undefined && topMax > 0) listItems = listItems.top(topMax);
      // if (sortingColumn != undefined && sortingColumn.length > 0)
      //   listItems = listItems.orderBy(
      //     sortingColumn,
      //     sortingOrder === false ? false : true
      //   );
      let query: ICamlQuery = {
        ViewXml:
        camlquery
      };
      listItems = sp.web.lists.getByTitle(listName);

      listItems.getItemsByCAMLQuery(query)
        .then((alllistItems: any[]): void => {
          consoleLogger(
            "Success result while getting items from list '" +
            listName +
            "' in method getListItems():"
          );
          consoleLogger(alllistItems);
          resolve(alllistItems);
        },
          (error: any): void => {
            consoleLogger(
              "Exception while getting items from list '" +
              listName +
              "' in method getListItems():"
            );
            consoleLogger(error);
            reject(error);
          }
        );
    });
  }
  public static getListItemsFromRootWeb(
    listName: string,
    selectedColumns?: string[],
    expandColumns?: string[],
    filterCondition?: string,
    topMax?: number,
    sortingColumn?: string,
    sortingOrder?: boolean
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject): void => {
      let listItems: any;
      listItems = sp.site.rootWeb.lists.getByTitle(listName).items;
      if (selectedColumns != undefined && selectedColumns.length > 0)
        listItems = listItems.select(selectedColumns.toString());
      if (expandColumns != undefined && expandColumns.length > 0)
        listItems = listItems.expand(expandColumns.toString());
      if (filterCondition != undefined && filterCondition.length > 0)
        listItems = listItems.filter(filterCondition);
      if (topMax != undefined && topMax > 0) listItems = listItems.top(topMax);
      if (sortingColumn != undefined && sortingColumn.length > 0)
        listItems = listItems.orderBy(
          sortingColumn,
          sortingOrder === false ? false : true
        );
      listItems.get().then(
        (alllistItems: any[]): void => {
          console.log(
            "Success result while getting items from list '" +
            listName +
            "' in method getListItems():"
          );
          console.log(alllistItems);
          resolve(alllistItems);
        },
        (error: any): void => {
          console.log(
            "Exception while getting items from list '" +
            listName +
            "' in method getListItems():"
          );
          console.log(error);
          reject(error);
        }
      );
    });
  }
  //#region  get
  public static getListItems(
    listName: string,
    selectedColumns?: string[],
    expandColumns?: string[],
    filterCondition?: string,
    topMax?: number,
    sortingColumn?: string,
    sortingOrder?: boolean
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject): void => {
      let listItems: any;
      if (listName.indexOf("User Information List") > -1)
        listItems = sp.site.rootWeb.lists.getByTitle(listName).items;
      else listItems = sp.web.lists.getByTitle(listName).items;
      if (selectedColumns != undefined && selectedColumns.length > 0)
        listItems = listItems.select(selectedColumns.toString());
      if (expandColumns != undefined && expandColumns.length > 0)
        listItems = listItems.expand(expandColumns.toString());
      if (filterCondition != undefined && filterCondition.length > 0)
        listItems = listItems.filter(filterCondition);
      if (topMax != undefined && topMax > 0) listItems = listItems.top(topMax);
      if (sortingColumn != undefined && sortingColumn.length > 0)
        listItems = listItems.orderBy(
          sortingColumn,
          sortingOrder === false ? false : true
        );
      listItems.get().then(
        (alllistItems: any[]): void => {
          consoleLogger(
            "Success result while getting items from list '" +
            listName +
            "' in method getListItems():"
          );
          consoleLogger(alllistItems);
          resolve(alllistItems);
        },
        (error: any): void => {
          consoleLogger(
            "Exception while getting items from list '" +
            listName +
            "' in method getListItems():"
          );
          consoleLogger(error);
          reject(error);
        }
      );
    });
  }

  private static sortByProperty = (property: string, order: boolean) => {
    return (a, b) => {
      if (order) {
        if (a[property] > b[property]) return 1;
        else if (a[property] < b[property]) return -1;
      } else {
        if (a[property] > b[property]) return -1;
        else if (a[property] < b[property]) return 1;
      }
      return 0;
    };
  };

  public static getLargeListItems(
    listName: string,
    selectedColumns?: string[],
    expandColumns?: string[],
    filterCondition?: string,
    topMax?: number,
    sortingColumn?: string,
    sortingOrder?: boolean
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject): void => {
      let listItems = sp.web.lists.getByTitle(listName).items;
      if (selectedColumns != undefined && selectedColumns.length > 0)
        listItems = listItems.select(selectedColumns.toString());
      if (expandColumns != undefined && expandColumns.length > 0)
        listItems = listItems.expand(expandColumns.toString());
      if (filterCondition != undefined && filterCondition.length > 0)
        listItems = listItems.filter(filterCondition);
      if (topMax != undefined && topMax > 0) listItems = listItems.top(topMax);
      listItems.getAll().then(
        (alllistItems: any[]): void => {
          consoleLogger(
            "Success result while getting items from list '" +
            listName +
            "' in method getLargeListItems():"
          );
          consoleLogger(alllistItems);
          //
          if (
            sortingColumn != null &&
            sortingColumn != "" &&
            sortingOrder != null
          ) {
            alllistItems = alllistItems.sort(
              this.sortByProperty(sortingColumn, sortingOrder)
            );
          }
          //
          resolve(alllistItems);
        },
        (error: any): void => {
          consoleLogger(
            "Exception while getting items from list '" +
            listName +
            "' in method getLargeListItems():"
          );
          consoleLogger(error);
          reject(error);
        }
      );
    });
  }

  public static getListItemById(
    listName: string,
    itemID: number,
    selectedColumns: string[],
    expandColumns: string[]
  ): Promise<any> {
    return new Promise<any[]>((resolve, reject): void => {
      let listItem = sp.web.lists.getByTitle(listName).items.getById(itemID);

      if (selectedColumns != undefined && selectedColumns.length > 0)
        listItem = listItem.select(selectedColumns.toString());
      if (expandColumns != undefined && expandColumns.length > 0)
        listItem = listItem.expand(expandColumns.toString());

      listItem.get().then(
        (response: any): void => {
          consoleLogger(
            "Success result while getting item from list '" +
            listName +
            "' in method getListItemById():"
          );
          consoleLogger(response);
          resolve(response);
        },
        (error: any): void => {
          consoleLogger(
            "Exception while getting item from list '" +
            listName +
            "' in method getListItemById():"
          );
          consoleLogger(error);
          reject(error);
        }
      );
    });
  }

  public static getChoiceField(
    listName: string,
    fieldName: string
  ): Promise<any> {
    return new Promise<any[]>((resolve, reject): void => {
      sp.web.lists
        .getByTitle(listName)
        .fields.getByInternalNameOrTitle(fieldName)()
        .then(
          (response: any): void => {
            consoleLogger(
              "Success result while getting getChoiceField from list '" +
              listName +
              "' in method getChoiceField():"
            );
            consoleLogger(response);
            resolve(response);
          },
          (error: any): void => {
            consoleLogger(
              "Exception while getting getChoiceField from list '" +
              listName +
              "' in method getChoiceField():"
            );
            consoleLogger(error);
            reject(error);
          }
        );
    });
  }

  //#endregion

  //#region folder
  public static getListItemsFromInsideFolder(
    serverRelativeUrl: string,
    listName: string,
    folderName: string,
    selectedColumns?: string[],
    expandColumns?: string[],
    filterCondition?: string,
    topMax?: number,
    sortingColumn?: string,
    sortingOrder?: boolean
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject): void => {
      //this.props.context.pageContext.web.serverRelativeUrl
      const listUri = serverRelativeUrl + "/Lists/" + listName;
      const folderuri = listUri + "/" + folderName;

      let listItems: any;
      if (listName.indexOf("User Information List") > -1)
        listItems = sp.site.rootWeb.lists.getByTitle(listName).items;
      else listItems = sp.web.getList(listUri).items;
      if (selectedColumns != undefined && selectedColumns.length > 0)
        listItems = listItems.select(selectedColumns.toString());
      if (expandColumns != undefined && expandColumns.length > 0)
        listItems = listItems.expand(expandColumns.toString());
      if (filterCondition != undefined && filterCondition.length > 0)
        listItems = listItems.filter(
          filterCondition + " and " + `FileDirRef eq '${folderuri}'`
        );
      else listItems = listItems.filter(`FileDirRef eq '${folderuri}'`);
      if (topMax != undefined && topMax > 0) listItems = listItems.top(topMax);
      if (sortingColumn != undefined && sortingColumn.length > 0)
        listItems = listItems.orderBy(
          sortingColumn,
          sortingOrder === false ? false : true
        );

      // listItems= sp.web.getList(listUri).items
      //     .filter(`FileDirRef eq '${folderuri}'`);

      listItems.get().then(
        (alllistItems: any[]): void => {
          consoleLogger(
            "Success result while getting items from list '" +
            listName +
            "' in method getListItems():"
          );
          consoleLogger(alllistItems);
          resolve(alllistItems);
        },
        (error: any): void => {
          consoleLogger(
            "Exception while getting items from list '" +
            listName +
            "' in method getListItems():"
          );
          consoleLogger(error);
          reject(error);
        }
      );
    });
  }

  public static checkFolderExist(
    serverRelativeUrl: string,
    listName: string,
    folderName: string,
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject): void => {
      //this.props.context.pageContext.web.serverRelativeUrl
      // const listUri = serverRelativeUrl + "/Lists/" + listName;
      // const folderuri = listUri + "/" + folderName;

      let query: ICamlQuery = {
        ViewXml:
          "<View>" +
          "<Query>" +
          "<Where>" +
          "<And>" +
          "<Eq>" +
          '<FieldRef Name="FSObjType"/>' +
          '<Value Type="Integer">1</Value>' +
          "</Eq>" +
          "<Eq>" +
          '<FieldRef Name="FileLeafRef" />' +
          '<Value Type="Text">' +
          folderName +
          "</Value>" +
          "</Eq>" +
          "</And>" +
          "</Where>" +
          "</Query>" +
          "<RowLimit>1</RowLimit>" +
          "</View>",
        // FolderServerRelativeUrl: folderuri,
      };

      sp.web.lists
        .getByTitle(listName)
        .getItemsByCAMLQuery(query)
        .then(
          (results) => {
            consoleLogger(
              `Success while getting items from list '${listName}' in method checkFolderExist()`
            );
            consoleLogger(results);
            resolve(results);
          },
          (error: any): void => {
            consoleLogger(
              `Exception while getting items from list '${listName}' in method checkFolderExist()`
            );
            consoleLogger(error);
            reject(error);
          }
        );
    });
  }

  public static createFolderInList(
    serverRelativeUrl: string,
    listName: string,
    folderName: string
  ): Promise<any> {
    return new Promise<any>((resolve, reject): void => {
      const listUri = serverRelativeUrl + "/Lists/" + listName;
      const folderuri = listUri + "/" + folderName;
      let listItems: any;
      listItems = sp.web.getList(listUri).items;
      listItems = listItems.filter(`FileDirRef eq '${folderuri}'`);

      // sp.web.lists
      //   .getByTitle(listName)
      //   .items.add({ Title: folderName, ContentTypeId: "0x0120" })
      //   .then((response) => {
      //     consoleLogger(response);
      //     response.item.update({
      //       Title: folderName,
      //       FileLeafRef: "/" + folderName,
      //     });
      //     consoleLogger(response);
      //     resolve(response);

      sp.web.lists
        .getByTitle(listName)
        .items.add({
          Title: getGUID(),
          FileSystemObjectType: 1,
          ContentTypeId: "0x0120",
        })
        .then((response) => {
          consoleLogger(response);
          response.item
            .update({
              Title: folderName,
              FileLeafRef: "/" + folderName,
            })
            .then((response_) => {
              consoleLogger(response_);
              resolve(response_);
            })
            .catch((error) => {
              consoleLogger(
                `Exception while creating folder in List '${listName}' in method createFolderInList():`
              );
              consoleLogger(error);
              throw new Error(error);
            });
        })
        .catch((error) => {
          consoleLogger(
            `Exception while creating folder in List '${listName}' in method createFolderInList():`
          );
          consoleLogger(error);
          throw new Error(error);
        });
    });
  }

  public static deleteItemsFromFolder(
    serverRelativeUrl: string,
    listName: string,
    folderName: string
  ): Promise<any> {
    return new Promise<any>(
      async (resolve, reject): Promise<void> => {
        const listUri = serverRelativeUrl + "/Lists/" + listName;
        const folderuri = listUri + "/" + folderName;
        let listItems: any;
        listItems = await sp.web
          .getList(listUri)
          .items.select("Id")
          .filter(`FileDirRef eq '${folderuri}'`)
          .getAll();
        let batch = sp.web.createBatch();
        listItems.forEach((item) => {
          sp.web
            .getList(listUri)
            .items.getById(item.Id)
            .inBatch(batch)
            .recycle();
        });

        batch
          .execute()
          .then((response) => {
            consoleLogger(response);
            resolve(response);
          })
          .catch((error) => {
            consoleLogger(
              `Exception while deleting items from folder in List '${listName}' in method deleteItemsFromFolder():`
            );
            consoleLogger(error);
            throw new Error(error);
          });
      }
    );
  }

  public static batchAddListItemInsideFolder(
    webAbsoluteUrl: string,
    listName: string,
    folderName: string,
    itemObj: any[]
  ): Promise<any> {
    const listPath = webAbsoluteUrl + "/Lists/" + listName;

    let batch = sp.web.createBatch();
    for (var i = 0; i < itemObj.length; i++) {
      let newValues: IListItemFormUpdateValue[] = [];
      for (var j = 0; j < Object.keys(itemObj[i]).length; j++) {
        let key = Object.keys(itemObj[i])[j];
        let val = itemObj[i][key] == null ? "" : itemObj[i][key];
        if (String(itemObj[i][key]))
          newValues.push({
            FieldName: key,
            FieldValue: String(itemObj[i][key]),
          });

        //JSON.stringify([{"Key": "i:0#.f|membership|"+"MyUserEmail"}])}
      }
      sp.web.lists
        .getByTitle(listName)
        .inBatch(batch)
        .addValidateUpdateItemUsingPath(newValues, `${listPath}/${folderName}`);
    }
    return batch
      .execute()
      .then((response) => {
        consoleLogger(
          "Success result while adding items to list '" +
          listName +
          "' in method batchAddListItemInsideFolder():"
        );
        consoleLogger(response);
        return response;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while adding items to List '" +
          listName +
          "' in method batchAddListItemInsideFolder():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }

  public static createFolderIfNotExistinList(
    serverRelativeUrl: string,
    listName: string,
    folderName: string
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject): void => {
      const listUri = serverRelativeUrl + "/Lists/" + listName;
      const folderuri = listUri + "/" + folderName;
      this.checkFolderExist(serverRelativeUrl, listName, folderName)
        .then((response) => {
          consoleLogger(response);
          let folderExist = response.length == 0 ? false : true;
          if (!folderExist) {
            this.createFolderInList(serverRelativeUrl, listName, folderName)
              .then((response) => {
                consoleLogger(response);
                consoleLogger(
                  `Success while adding folder to List ${listName}' in method createItemInsideFolderinList()`
                );
                consoleLogger(response);
                resolve(response);
              })
              .catch((error: any) => {
                consoleLogger(
                  `Exception while adding folder to List '${listName}' in method createFolderIfNotExistinList()`
                );
                consoleLogger(error);
                throw new Error(error);
              });
          } else {
            this.deleteItemsFromFolder(serverRelativeUrl, listName, folderName)
              .then((response) => {
                consoleLogger(response);
                consoleLogger(
                  `Success while adding folder to List ${listName}' in method createItemInsideFolderinList()`
                );
                consoleLogger(response);
                resolve(response);
              })
              .catch((error: any) => {
                consoleLogger(
                  `Exception while adding folder to List '${listName}' in method createFolderIfNotExistinList()`
                );
                consoleLogger(error);
                throw new Error(error);
              });
          }
        })
        .catch((error: any) => {
          consoleLogger(
            "Exception while adding item to List '" +
            listName +
            "' in method createFolderIfNotExistinList():"
          );
          consoleLogger(error);
          throw new Error(error);
        });
    });
  }

  //#endregion

  //#region  add
  public static addListItem(listName: string, itemObj: any): Promise<any> {
    return sp.web.lists
      .getByTitle(listName)
      .items.add(itemObj)
      .then((response) => {
        consoleLogger(
          "Success result while adding item to list '" +
          listName +
          "' in method addListItem():"
        );
        consoleLogger(response.data);
        return response.data;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while adding item to List '" +
          listName +
          "' in method addListItem():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }

  public static batchAddListItem(
    listName: string,
    itemObj: any[]
  ): Promise<any> {
    let list = sp.web.lists.getByTitle(listName);
    return list.getListItemEntityTypeFullName().then((entityTypeFullName) => {
      let batch = sp.web.createBatch();
      itemObj.forEach((value, index, array) => {
        list.items.inBatch(batch).add(value, entityTypeFullName);
      });
      return batch
        .execute()
        .then((response) => {
          consoleLogger(
            "Success result while adding items to list '" +
            listName +
            "' in method batchAddListItem():"
          );
          consoleLogger(response);
          return response;
        })
        .catch((error) => {
          consoleLogger(
            "Exception while adding items to List '" +
            listName +
            "' in method batchAddListItem():"
          );
          consoleLogger(error);
          throw new Error(error);
        });
    });
  }
  //#endregion

  //#region update
  public static updateListItemById(
    listName: string,
    itemID: number,
    itemObj: any
  ): Promise<any> {
    return sp.web.lists
      .getByTitle(listName)
      .items.getById(itemID)
      .update(itemObj)
      .then((response) => {
        consoleLogger(
          "Success result while updating item in list '" +
          listName +
          "' in method updateListItemById():"
        );
        consoleLogger(response.data);
        return response.data;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while updating item in List '" +
          listName +
          "' in method updateListItemById():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }

  public static batchUpdateListItemById(
    listName: string,
    itemIDs: number[],
    itemObj: any[]
  ): Promise<any> {
    let list = sp.web.lists.getByTitle(listName);
    return list.getListItemEntityTypeFullName().then((entityTypeFullName) => {
      let batch = sp.web.createBatch();
      itemIDs.forEach((value, index, array) => {
        list.items
          .getById(value)
          .inBatch(batch)
          .update(itemObj[index], "*", entityTypeFullName);
      });
      return batch
        .execute()
        .then((response) => {
          consoleLogger(
            "Success result while updating items in list '" +
            listName +
            "' in method batchUpdateListItemById():"
          );
          consoleLogger(response);
          return response;
        })
        .catch((error) => {
          consoleLogger(
            "Exception while updating items in List '" +
            listName +
            "' in method batchUpdateListItemById():"
          );
          consoleLogger(error);
          throw new Error(error);
        });
    });
  }
  //#endregion

  //#region batch addupdate
  public static async batchInsertUpdateMultipleListItem(
    data: IBatchUpdateReq[]
  ): Promise<any> {
    let batch = sp.web.createBatch();
    for (var i = 0; i < data.length; i++) {
      let list = sp.web.lists.getByTitle(data[i].ListName);
      const entityTypeFullName = await list.getListItemEntityTypeFullName();
      for (var j = 0; j < data[i].IBatchItems.length; j++) {
        if (data[i].IBatchItems[j].IsAdd) {
          list.items
            .inBatch(batch)
            .add(data[i].IBatchItems[j].Data, entityTypeFullName);
        } else {
          list.items
            .getById(data[i].IBatchItems[j].Id)
            .inBatch(batch)
            .update(data[i].IBatchItems[j].Data, "*", entityTypeFullName);
        }
      }
    }
    return batch
      .execute()
      .then((response) => {
        consoleLogger(
          "Success result while adding items to list '" +
          JSON.stringify(data) +
          "' in method batchInsertUpdateMultipleListItem():"
        );
        consoleLogger(response);
        return response;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while adding items to List '" +
          JSON.stringify(data) +
          "' in method batchInsertUpdateMultipleListItem():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }
  //#endregion

  //#region delete
  public static deleteItemById(listName: string, id: any): Promise<any> {
    return sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .delete()
      .then((response) => {
        consoleLogger(
          `Success result while deleting item from list '${listName}' in method deleteItemById():`
        );
        return response;
      })
      .catch((error) => {
        consoleLogger(
          `Exception while deleting item from list '${listName}' in method deleteItemById():`
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }
  //#endregion

  //#region logs
  public static addActivityLog(itemObj: any): Promise<any> {
    return sp.web.lists
      .getByTitle(ListNames.ActivityLogs)
      .items.add(itemObj)
      .then((response) => {
        consoleLogger(
          "Success result while adding item to list ActivityLogs in method addActivityLog():"
        );
        consoleLogger(response.data);
        return response.data;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while adding item to List ActivityLogs in method addActivityLog():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }

  public static addErrorLog(itemObj: any): Promise<any> {
    return sp.web.lists
      .getByTitle(ListNames.ErrorLog)
      .items.add(itemObj)
      .then((response) => {
        consoleLogger(
          "Success result while adding item to list ErrorLog in method addErrorLog():"
        );
        consoleLogger(response.data);
        return response.data;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while adding item to List ErrorLog in method addErrorLog():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }

  public static addTransactionLog(itemObj: any): Promise<any> {
    return sp.web.lists
      .getByTitle(ListNames.TransactionLog)
      .items.add(itemObj)
      .then((response) => {
        consoleLogger(
          "Success result while adding item to list TransactionLog in method addTransactionLog():"
        );
        consoleLogger(response.data);
        return response.data;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while adding item to List TransactionLog in method addTransactionLog():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }

  public static addPRHistory(itemObj: any): Promise<any> {
    return sp.web.lists
      .getByTitle(ListNames.PRHistory)
      .items.add(itemObj)
      .then((response) => {
        consoleLogger(
          "Success result while adding item to list PRHistory in method addPRHistory():"
        );
        consoleLogger(response.data);
        return response.data;
      })
      .catch((error) => {
        consoleLogger(
          "Exception while adding item to List PRHistory in method addPRHistory():"
        );
        consoleLogger(error);
        throw new Error(error);
      });
  }
  //#endregion

  //#region user
  public static getCurrentUser() {
    return sp.web.currentUser();
  }

  public static checkUserPermission(siteURL: string): Promise<any[]> {
    let web: any;
    return new Promise<any[]>((resolve, reject): void => {
      web = Web(siteURL);
      web.get().then(
        (access: any[]): void => {
          resolve(access);
        },
        (error: any): void => {
          reject(error);
        }
      );
    });
  }
  //#endregion

  //#region file
  public static uploadFile = (
    _file: File,
    location: string,
    FileName?: string
  ): Promise<any> => {
    let fileName = FileName == null ? _file.name : FileName;
    if (_file.size <= 10485760) {
      return new Promise<any[]>((resolve, reject): void => {
        sp.web
          .getFolderByServerRelativeUrl(location)
          .files.add(fileName, _file, true)
          .then(({ file }) => file.getItem())
          .then(
            (item: any) => {
              consoleLogger("File Uploaded");
              resolve(item);
            },
            (error: any): void => {
              consoleLogger(
                "Exception while uploading file: '" +
                fileName +
                "' in method uploadFile()"
              );
              consoleLogger(error);
              reject(error);
            }
          );
      });
    } else {
      return new Promise<any[]>((resolve, reject): void => {
        sp.web
          .getFolderByServerRelativeUrl(location)
          .files.addChunked(fileName, _file)
          .then(({ file }) => file.getItem())
          .then(
            (item: any) => {
              consoleLogger("File Uploaded");
              resolve(item);
            },
            (error: any): void => {
              consoleLogger(
                "Exception while uploading file: '" +
                fileName +
                "' in method uploadFile()"
              );
              consoleLogger(error);
              reject(error);
            }
          );
      });
    }
  };

  public static addAttachment(
    listName: string,
    Id: number,
    fileName: string,
    content: any
  ): Promise<any> {
    return new Promise<any[]>((resolve, reject): void => {
      sp.web.lists
        .getByTitle(listName)
        .items.getById(Id)
        .attachmentFiles.add(fileName, content)
        .then(
          (response: any): void => {
            consoleLogger(
              "Success result while uploading attachment to list '" +
              listName +
              "' in method addAttachment():"
            );
            consoleLogger(response);
            resolve(response);
          },
          (error: any): void => {
            consoleLogger(
              "Exception while uploading attachment to list '" +
              listName +
              "' in method addAttachment():"
            );
            consoleLogger(error);
            reject(error);
          }
        );
    });
  }
  //#endregion
}
