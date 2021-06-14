/**
 * This file was originally written in ts but I ran into issues running the server
 */
const express = require("express");
const app = express();
const db = require("./queries");
const port = 4000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/devices", db.getDevices);
app.get("/devices/sn/:sn", db.getDevicesBySN);
app.get("/devices/deviceid/:id", db.getDevicesById);
app.get("/devices/uniqueid/:sn", db.getDevicesForSerialNumber);
app.get("/devices/unique", db.getUniqueDevices);
app.get("/devices/unique/ids", db.getUniqueDevicesIds);
app.get("/devices/mains/:sn", db.getMainDevicesBySN);
app.get("/devices/wattagebysn/:sn", db.getLargestWattageBySN);
app.get("/devices/wattagebyid/:id", db.getLargestWattageByID);
app.get("/devices/wattagebysnid/:sn/:id", db.getLargestWattageBySNandID);
app.get("/devices/sn/:sn/id/:id", db.getFilteredSerialNumberByDeviceID);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
