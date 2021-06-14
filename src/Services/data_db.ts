import axios from "axios";

const url = "http://localhost:4000";
axios.defaults.baseURL = url;

export async function getUniqueDevices() {
  const response = await axios.get("/devices/unique");
  return response.data;
}

export async function getUniqueDeviceIds() {
  const response = await axios.get("/devices/unique/ids");
  return response.data;
}

export async function getMainDevicesBySN(sn: string): Promise<any> {
  const response = await axios.get("/devices/mains/" + sn);
  return response.data;
}

export async function getLargestWattageBySN(sn: string): Promise<any> {
  const response = await axios.get("/devices/wattagebysn/" + sn);
  return response.data;
}

export async function getLargestWattageByID(id: string): Promise<any> {
  const response = await axios.get("/devices/wattagebyid/" + id);
  return response.data;
}

export async function getLargestWattageBySNandID(
  sn: string,
  id: string
): Promise<any> {
  const response = await axios.get("/devices/wattagebysnid/" + sn + "/" + id);
  return response.data;
}

export async function getDevicesById(id: string): Promise<any> {
  const response = await axios.get("/devices/deviceid/" + id);
  return response.data;
}

export async function getFilteredSerialNumberByDeviceID(
  sn: string,
  id: string
): Promise<any> {
  const response = await axios.get("/devices/sn/" + sn + "/id/" + id);
  return response.data;
}

export async function getDevicesForSerialNumber(sn: string) {
  const response = await axios.get("/devices/uniqueid/" + sn);
  return response.data;
}
