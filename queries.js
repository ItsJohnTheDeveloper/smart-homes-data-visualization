/**
 * This file was also written in ts
 */
const { Pool } = require("pg");

const config = {
  user: "smarthomesdashboarduser@smarthomes",
  password: "",
  host: "smarthomes.postgres.database.azure.com",
  database: "wattage",
  port: 5432,
  ssl: true,
};

const pool = new Pool(config);
const limit = 1440;

const fetchAsync = async (req, res, query) => {
  const client = await pool.connect();
  let data = null;
  console.info(`${req.method} ${req.url}`);

  try {
    //transactions
    await client.query("BEGIN");
    try {
      data = await client.query(query);
      await client.query("COMMIT");
      return res.status(201).json(data.rows);
    } catch (err) {
      await client.query("ROLLBACK");
      console.info(err);
      console.info("An error occured hitting " + req.originalUrl);
      res.status(404).res.end();
      throw err;
    }
  } finally {
    client.release();
  }
};

const getDevices = async (req, res) => {
  const query = `SELECT * FROM readings`;
  return await fetchAsync(req, res, query);
};

const getDevicesBySN = async (req, res) => {
  let { sn } = req.params;
  const query = `SELECT * FROM readings WHERE "Serial_Number" = '${sn}' LIMIT ${limit}`;
  return await fetchAsync(req, res, query);
};

const getDevicesById = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM readings WHERE "Device_ID" = '${id}'`;
  return await fetchAsync(req, res, query);
};

const getUniqueDevices = async (req, res) => {
  const query =
    'SELECT DISTINCT "Serial_Number" FROM readings ORDER BY "Serial_Number" ASC';
  return await fetchAsync(req, res, query);
};

const getUniqueDevicesIds = async (req, res) => {
  const query =
    'SELECT DISTINCT "Device_ID" FROM readings ORDER BY "Device_ID" ASC';
  return await fetchAsync(req, res, query);
};

const getMainDevicesBySN = async (req, res) => {
  const { sn } = req.params;
  // For efficiency I could grab just datetime, and wattage but I dont think it really matters.
  const query = `SELECT * FROM readings WHERE "Device_ID" = 'mains' AND "Serial_Number" = '${sn}' LIMIT ${limit}`;
  return await fetchAsync(req, res, query);
};

const getLargestWattageBySN = async (req, res) => {
  const { sn } = req.params;
  const query = `SELECT MAX("Wattage") FROM readings WHERE "Serial_Number" = '${sn}' LIMIT ${limit}`;
  return await fetchAsync(req, res, query);
};

const getLargestWattageByID = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT MAX("Wattage") FROM readings WHERE "Device_ID" = '${id}' LIMIT ${limit}`;
  return await fetchAsync(req, res, query);
};

const getLargestWattageBySNandID = async (req, res) => {
  const { sn, id } = req.params;
  const query = `SELECT MAX("Wattage") FROM readings WHERE "Serial_Number" = '${sn}' AND "Device_ID" = '${id}' LIMIT ${limit}`;
  return await fetchAsync(req, res, query);
};

const getFilteredSerialNumberByDeviceID = async (req, res) => {
  const { sn, id } = req.params;
  const query = `SELECT * FROM readings WHERE "Serial_Number" = '${sn}' AND "Device_ID" = '${id}' LIMIT ${limit}`;
  return await fetchAsync(req, res, query);
};

const getDevicesForSerialNumber = async (req, res) => {
  const { sn } = req.params;
  const query = `SELECT DISTINCT "Device_ID" FROM readings WHERE "Serial_Number" = '${sn}' LIMIT ${limit}`;
  return await fetchAsync(req, res, query);
};

module.exports = {
  getDevices,
  getDevicesBySN,
  getDevicesById,
  getDevicesForSerialNumber,
  getUniqueDevices,
  getUniqueDevicesIds,
  getMainDevicesBySN,
  getLargestWattageBySN,
  getLargestWattageByID,
  getLargestWattageBySNandID,
  getFilteredSerialNumberByDeviceID,
};
