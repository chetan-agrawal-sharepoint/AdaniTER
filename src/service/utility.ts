const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default class utility {
  public static formatDateTime = () => {
    const dateTime = new Date();
    const day = days[dateTime.getDay()];
    const date =
      dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const hour =
      dateTime.getHours() > 12
        ? dateTime.getHours() - 12 < 10
          ? `0${dateTime.getHours() - 12}`
          : dateTime.getHours() - 12
        : dateTime.getHours() < 10
        ? `0${dateTime.getHours()}`
        : dateTime.getHours();
    const minute =
      dateTime.getMinutes() < 10
        ? `0${dateTime.getMinutes()}`
        : dateTime.getMinutes();
    const second =
      dateTime.getSeconds() < 10
        ? `0${dateTime.getSeconds()}`
        : dateTime.getSeconds();
    const ampm = dateTime.getHours() < 12 ? "AM" : "PM";

    return `${day} ${date} ${month}, ${hour}:${minute}:${second} ${ampm}`;
  };

  public static SignOut = () => {
    window.location.href = "/_layouts/15/SignOut.aspx";
  };

  public static arrayUnique(array: any[]): any[] {
    var a: any[] = array.slice();
    if (a.length > 0) {
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i].Id === a[j].Id) a.splice(j--, 1);
        }
      }
    }
    return a;
  }

  public static UniquePRList = (arr: any[], matchid: string): any[] => {
    const filteredArr = arr.reduce((acc, current) => {
      const x = acc.find((item) => item[matchid] === current[matchid]);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return filteredArr;
  };

  public static sortArray = (
    unsortedArray: any[],
    propertyToSortBy: string
  ): any[] =>
    unsortedArray.sort((a, b) =>
      a[propertyToSortBy] < b[propertyToSortBy] ? -1 : 1
    );

  public static IsStringNullorEmpty = (text: string): boolean =>
    !(text != null && text != "");

  public static IsOptionNullOrZero = (option): boolean =>
    !(option != null && option.Id != 0);

  public static IsArrayNullOrZeroLength = (array: any[]): boolean =>
    !(array != null && array.length > 0);

  public static differenceInDays = (date1: Date, date2: Date): number =>
    Math.floor((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
}
