const db = require("../src/models/db.js");

const queryDB = async (query, params) => {
  try {
    const result = await db.query(query, params);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = queryDB;