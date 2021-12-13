const Sequelize = require("sequelize");

//import env variables
require("dotenv").config();

// check if running remotely with JAWSDB
if (process.env.JAWSDB_URL) {
  // create remote db connection
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // create local db connection
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
