import * as React from "react";
import utility from "../../service/utility";
const DateTime: React.FC<{}> = (props: React.PropsWithChildren<{}>) => {
  const [DateTime, setDateTime] = React.useState<string>("");
  const tick = () => {
    setDateTime(utility.formatDateTime());
  };
  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });
  return <p>{DateTime}</p>;
};
export default DateTime;
