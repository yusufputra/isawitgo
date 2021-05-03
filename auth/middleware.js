const jwt = require("jsonwebtoken");

require("dotenv").config();

//please be carefull , dont pass your token with "" ,
//otherwise it will make you unathorized.
function checkToken(req, res, next) {
  console.log("check auth");
  const authHeader = req.get("Authorization");
  if (authHeader) {
    let bearer = authHeader.split(" ");
    if (bearer[0] == "Bearer") {
      jwt.verify(bearer[1], process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "Authorization not found" });
    }
  } else {
    next();
  }
}

function isLoggedIn(req, res, next) {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    const error = new Error("Unauthorized");
    res.status(401);
    next(error);
  }
}

module.exports = {
  checkToken,
  isLoggedIn,
};
