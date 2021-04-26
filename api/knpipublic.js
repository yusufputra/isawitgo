const express = require("express");
const options = require("../db/connection");
const router = express.Router();

const multer = require("multer");
var upload = multer({ dest: "./upload/" });

var knex = require("knex")(options);
router.get("/", (req, res) => {
  res.json("Hallo");
});

//doesn't need any body to accses . this is get method
router.get("/getContact", (req, res, next) => {
  const query = "Select * from contact";
  console.log(query);
  knex.schema
    .raw(query)
    .then((ress) => {
      res.json(ress);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
//doesn't need any body to accses . this is get method

router.get("/getContent", (req, res, next) => {
  const query = "Select * from content";
  console.log(query);
  knex.schema
    .raw(query)
    .then((ress) => {
      res.json(ress);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

//this get method need body of idThread .
//idThread is used to create an array of comment.
router.get("/getFiles", (req, res, next) => {
  const query = "Select * from files";
  knex.schema
    .raw(query)
    .then((ress) => {
      res.json(ress);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/postFile", upload.single("gambar"), (req, res, next) => {
  console.log(req);
  // if(req.files.gambar){
  //     var file = req.files.gambar,
  //         name = file.name,
  //         type = file.mimetype;
  //     var uploadpath = __dirname + '/upload/' + name;
  //     file.mv(uploadpath,function(err){
  //         if(err){
  //             console.log("File Upload Failed",name,err);
  //             res.send("Error Occured!" + __dirname)
  //         }
  //         else {
  //             console.log("File Uploaded",name);
  //             res.send('Done! Uploading files')
  //         }
  //     });
  // }
  // else {
  //   res.send("No File selected !");
  //   res.end();
  // };

  // console.log(req);
  // if (Object.keys(req.files).length == 0) {
  //     return res.status(400).send('No files were uploaded.');
  // }
  // let gambar = req.files.gambar;
  // gambar.mv('/upload/', function(err) {
  // if (err)
  //     return res.status(500).send(err);

  // res.send('File uploaded!');
  // });
  // let query="insert into files (filesName,fileSize,fileLink)"+
  // " values ('"+req.body.Fname+"','"+req.body.Fsize+"','"+req.body.Flink+"')";
  // console.log(query);
  // knex.schema.raw(query).then(ress=>{
  //     res.json('done');
  // }).catch(err=>{
  //     res.status(404);
  //     res.json(err);
  // })
});

/*
{
	"name" : "xxx",
    "email": "xxxx",
    "subject": "xxx",
    "message": "xxx"
}
 */
router.post("/postContact", (req, res, next) => {
  console.log(req.body);

  let query =
    "insert into contact (contactName, contactEmail, contactSubject, contactMessage) " +
    "values ('" +
    req.body.name +
    "','" +
    req.body.email +
    "','" +
    req.body.subject +
    "','" +
    req.body.message +
    "')";
  console.log(query);
  knex.schema
    .raw(query)
    .then((ress) => {
      res.json("done");
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
});

router.post("/postPengaduan", (req, res, next) => {
  console.log(req.body);

  let query =
    "insert into contact (contactName, contactEmail, contactSubject, contactMessage) " +
    "values ('" +
    req.body.name +
    "','" +
    req.body.email +
    "','[Pengaduan] " +
    req.body.subject +
    "','" +
    req.body.message +
    "')";
  console.log(query);
  knex.schema
    .raw(query)
    .then((ress) => {
      res.json("done");
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
});

module.exports = router;
