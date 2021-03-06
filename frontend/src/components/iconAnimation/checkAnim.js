import React, { useContext, useState } from "react";
import mojs from "@mojs/core";

import { Checkbox } from "@material-ui/core";
// url axios
import axios from "axios";
import { URL } from "../../config";

// react-alert
import { useAlert } from "react-alert";
import { FetchStatusContext } from "../homePage/categoryList";

const burst = new mojs.Burst({
  left: 0,
  top: 0,
  radius: { 0: 50 },
  count: 8,
  children: {
    shape: "circle",
    radius: 20,
    fill: ["#91D2D5", "#BEE1BE", "#EDF1A4"],
    strokeWidth: 5,
    duration: 2000,
  },
});

export default function CheckAnim(props) {
  const { tid, status, fetchData } = props;
  const [checkStatus, setCheckStatus] = useState(status);
  const alert = useAlert();

  const fetchStatus = useContext(FetchStatusContext);

  const handleChange = async (event) => {
    setCheckStatus(!checkStatus);
    await axios.post(
      URL + "updateTaskStatus?task_id=" + tid + "&status=" + !status
    );
    fetchData();
    fetchStatus();
    if(status) {
      alert.info("Task restart!");
    } else {
      alert.success("Task finished");
    }
  };

  const play = (e) => {
    burst.tune({ x: e.pageX, y: e.pageY }).setSpeed(5).replay();
  };

  return (
    <div onClick={play}>
      <Checkbox checked={checkStatus} onChange={handleChange} color="primary" />
    </div>
  );
}
