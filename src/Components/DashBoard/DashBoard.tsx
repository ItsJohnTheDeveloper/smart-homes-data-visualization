import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Selector from "../Common/Selector";
import { Device } from "../../Models/device";
import {
  getUniqueDevices,
  getUniqueDeviceIds,
  getDevicesForSerialNumber,
  getMainDevicesBySN,
  getLargestWattageBySN,
  getLargestWattageByID,
  getLargestWattageBySNandID,
  getDevicesById,
  getFilteredSerialNumberByDeviceID,
} from "../../Services/data_db";
import moment from "moment";
import {
  Line,
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    flexDirection: "column",
    maxWidth: 1446,
    "@media only screen and (min-width: 1532px)": {
      paddingLeft: 80,
    },
  },
  title: {
    fontSize: 32,
    color: "black",
    padding: 50,
    fontFamily: theme.typography.fontFamily.primary,
  },
  filterSelectors: {
    display: "flex",
    justifyContent: "space-evenly",
    flexFlow: "wrap",
  },
  topUI: {
    display: "flex",
    flexDirection: "column",
  },
  chartWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
    maxHeight: 470,
  },
  resetBtn: {
    color: "white",
    backgroundColor: theme.palette.layers.theme,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: 9,
    padding: "8px 24px",
    alignSelf: "center",
    boxShadow: "0 0 0 1px rgb(0 0 0 / 4%), 0 4px 8px 0 rgb(0 0 0 / 20%)",
    // Desktop Device
    "@media (pointer:fine)": {
      "&:hover": {
        outline: "none !important",
        opacity: 0.9,
      },
    },
  },
  loadingIcon: {
    width: "65px !important",
    height: "65px !important",
    alignSelf: "center",
    marginTop: 100,
    color: theme.palette.layers.lighterTheme,
  },
}));

export default function DashBoard() {
  const classes = useStyles();

  const [sn, setSN] = useState("");
  const [id, setID] = useState("");
  const [device, setDevice] = useState([]);
  const [maxWatt, setMaxWatt] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (id && sn) {
        getDeviceFilteredBySNandID(sn, id);
      } else {
        getDeviceById();
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    //reset id when serial number is selected
    setID("");
    const getData = async () => {
      getDeviceBySerialNumber();
    };
    getData();
  }, [sn]);

  const getDeviceFilteredBySNandID = async (
    serialNumber: string,
    deviceId: string
  ) => {
    try {
      setIsLoading(true);
      const data = await getFilteredSerialNumberByDeviceID(
        serialNumber,
        deviceId
      );
      const wattData = await getLargestWattageBySNandID(serialNumber, deviceId);
      const maxWattage = Math.floor(wattData[0].max);
      setMaxWatt(maxWattage);
      setDevice(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("an error occured getting device filtered by sn and id");
    }
  };

  const getDeviceById = async () => {
    if (!id) {
      return;
    }
    try {
      setIsLoading(true);
      const data = await getDevicesById(id);
      const wattData = await getLargestWattageByID(id);
      const maxWattage = Math.floor(wattData[0].max);
      setMaxWatt(maxWattage);
      setDevice(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("an error occured getting devices by id");
    }
  };

  const getDeviceBySerialNumber = async () => {
    if (!sn) {
      return;
    }
    try {
      setIsLoading(true);
      const data = await getMainDevicesBySN(sn);
      const wattData = await getLargestWattageBySN(sn);
      const maxWattage = Math.floor(wattData[0].max);
      setMaxWatt(maxWattage);
      setDevice(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("an error occured getting devices by serial number");
    }
  };

  const resetChart = () => {
    setSN("");
    setID("");
    setDevice([]);
    setMaxWatt(1000);
    setIsLoading(false);
  };

  const getDeviceIds = () => {
    console.log("inside getDeviceIds()");
    if (sn) {
      return getDevicesForSerialNumber(sn);
    } else {
      return getUniqueDeviceIds();
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.topUI}>
          <div className={classes.title}>Dashboard</div>
          <div className={classes.filterSelectors}>
            <Selector
              title={"Serial Number"}
              objProp={Device.serialNumber}
              getData={getUniqueDevices}
              value={sn}
              setValue={setSN}
            />
            <Selector
              title={"Device ID"}
              objProp={Device.id}
              getData={getDeviceIds}
              value={id}
              setValue={setID}
              refresh={sn}
            />
            <div className={classes.resetBtn} onClick={resetChart}>
              <div>{"Clear"}</div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <CircularProgress className={classes.loadingIcon} />
        ) : (
          <ResponsiveContainer
            className={classes.chartWrapper}
            height={700}
            aspect={3}
          >
            <LineChart
              data={device}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="DateTime"
                name="Time"
                tickFormatter={
                  !device.length
                    ? undefined
                    : (unixTime) => moment(unixTime).format("hh:mm a")
                }
                // label="Time"
              />
              <YAxis
                type="number"
                domain={[0, maxWatt]}
                tickFormatter={(tickValue) => `${tickValue}W`}
                // label="Wattage"
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Wattage"
                stroke="#4c68d6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
}
