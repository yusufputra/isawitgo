require("dotenv").config();
// module.exports = {
//   client: "mssql",
//   connection: {
//     host: "isawit.database.windows.net",
//     user: "isawit",
//     password: "pagikucerahku2021^^",
//     database: "isawit",
//     options: {
//       port: 1443,
//       encrypt: true,
//     },
//   },
// };

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    options: {
      port: process.env.DB_PORT,
      encrypt: process.env.DB_ECNRYPTED,
    },
  },
};
