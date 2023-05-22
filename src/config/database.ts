import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver =
  process.env.NODE_ENV === "test"
    ? (process.env.DB_TEST_DRIVER as Dialect)
    : (process.env.DB_DRIVER as Dialect);
const dbPassword = process.env.DB_PASSWORD;

let sequelizeConnection: Sequelize;

if (process.env.NODE_ENV === "test") {
  sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    storage: process.env.DB_TEST_STORAGE,
    dialect: "sqlite",
    logging: false,
  });
} else {
  sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: process.env.NODE_ENV === "production" ? false : console.log,
    define: {
      underscored: true,
    },
  });
}
export default sequelizeConnection;
