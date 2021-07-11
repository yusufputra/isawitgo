const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const app = express();
const fileupload = require("express-fileupload");

require("dotenv").config();
const api = require("./api/secured");
const kyc = require("./api/kyc");
const auth = require("./auth/index");
const lahan = require("./api/lahan");
const pengajuan = require("./api/pengajuan");
const transaksi = require("./api/transaksi");
const portofolio = require("./api/portofolio");
const testimoni = require("./api/testimoni");
const lahanDitawarkan = require("./api/lahanDitawarkan");
const middleware = require("./auth/middleware");
app.use(volleyball);
// app.use(cors({
//   origin:'http://localhost:3000'
// }))

app.use(cors());

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);
// app.use('/pubs',pubs);
app.use(middleware.checkToken);
app.use(express.json());
app.use("/auth", auth);
app.use("/api/", middleware.isLoggedIn, api);
app.use("/api/kyc", middleware.isLoggedIn, kyc);
app.use("/api/lahan", middleware.isLoggedIn, lahan);
app.use("/api/pengajuan", middleware.isLoggedIn, pengajuan);
app.use("/api/transaksi", middleware.isLoggedIn, transaksi);
app.use("/api/portofolio", middleware.isLoggedIn, portofolio);
app.use("/api/testimoni", middleware.isLoggedIn, testimoni);
app.use("/api/lahanDitawarkan", middleware.isLoggedIn, lahanDitawarkan);
app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨Hello World! 🌈✨🦄",
  });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
