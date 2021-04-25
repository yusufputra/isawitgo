const express = require('express');
const options = require('../db/connection');
const router = express.Router();

const multer = require('multer');
var upload = multer({ dest: './upload/' });



var knex = require('knex')(options);


router.get('/',(req,res)=>{
    res.json(
     req.user
    )
})




//doesn't need any body to accses . this is get method
router.get('/getContact',(req,res,next)=>{
    const query= "Select * from contact"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404).json(err);
    })
})
//doesn't need any body to accses . this is get method

router.get('/getContent',(req,res,next)=>{
    const query= "Select * from content"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404).json(err);
    })
})



//this get method need body of idThread . 
//idThread is used to create an array of comment.
router.get('/getFiles',(req,res,next)=>{
    const query = "Select * from files"
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.json(err);
    })

})



//when you want to accses with post thread method in this route , 
//you need to pass body like this
/*

 make sure you pass with right key , so backend can catch your pass , otherwise
 it will return an error

*/
/*
{
	"title" : "xxx",
    "category": "xxxx",
    "isi": "xxx",
    "image": "xxx"
}
 */
router.post('/postContent',(req,res,next)=>{
    console.log(req.body);

    let query="insert into content(contentTitle,contentCategory,contentIsi,contenImg,contentOwner) values "+
    "('"+req.body.title+"','"+req.body.category+"','"+req.body.isi+"','"+req.body.image+"','"+req.user.username+"')";
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })
})

/*
{
	"Fname" : "xxx",
    "Fsize": "xxxx",
    "Flink": "xxx"
}
 */
router.post('/postFile',upload.single('gambar'),(req,res,next)=>{
    let query="insert into files (filesName,fileLink)"+
    " values ('"+req.body.Fname+"','"+req.body.Flink+"')";
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })
})

router.post('/uploadFile',upload.single('gambar'), (req, res,nex) => {
    console.log(req);
    if(req.files.gambar){
        var file = req.files.gambar,
            name = file.name,
            type = file.mimetype;
        var uploadpath = __dirname + '/upload/' + name;
        file.mv(uploadpath,function(err){
            if(err){
                console.log("File Upload Failed",name,err);
                // res.send("Error Occured!" + __dirname)
            }
            else {
                console.log("File Uploaded",name);
                console.log(uploadpath)
                const payload ={
                    "filepath" : uploadpath
                }
                res.json(payload);
                // res.send('Done! Uploading files')
            }
        });
    }
    else {
      res.send("No File selected !");
      res.end();
    };
});

//when you want to accses with post comment method in this route , 
//you need to pass body like this
/*

{
    "idThread": "YourIDTHread",
    "comment": "Comment"
}
 make sure you pass with right key , so backend can catch your pass , otherwise
 it will return an error

*/

router.post('/postComment',(req,res,next)=>{

    let query= "INSERT into comment (idThread,idUser,comments)"+
    "VALUES ("+req.body.idThread+","+req.user._id+",'"+req.body.comment+"')"

    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })


})

//this is put method use for update comment 
/*
please be carefull if you want to edit comment please make sure you edit your own comment.

it's gonna be checked with your token.


   please send me body like this
   {
    "idComment": "your Comment Id",
       "comment": "Comment"
}


*/

router.put('/editComment',(req,res,next)=>{
    let queryUser = "Select * From comment where idUser= "+req.user._id+" and idComment="+req.body.idComment;
    console.log(queryUser)
    knex.schema.raw(queryUser).then(ress=>{
        console.log(ress)
        if(ress.length!=0){
                    let query = "UPDATE comment set comments = '"+req.body.comment+"' where idComment ="+req.body.idComment
                    knex.schema.raw(query).then(ress=>{
                        res.json('done');
                    }).catch(err=>{
                        res.status(404);
                        res.json(err);
                    })     
        }
        else{
            res.status(401);
            const error = new Error ("Not authorized");
            next(error)
        }
    })
})

//this is put method use for update Thread 
/*
please be carefull if you want to edit comment please make sure you edit your own comment.

it's gonna be checked with your token.

   please send me body like this
   {
    "idThread": "your Thread Id",
    "post": "post"
}
*/


router.put('/editThread',(req,res,next)=>{
    let queryUser = "Select*From thread where idUser= "+req.user._id+"and idThread="+req.body.idComment;
    knex.schema.raw(queryUser).then(ress=>{
        if(ress.length!=0){
    let query = "UPDATE thread set post = '"+req.body.post+"' where idThread ="+req.body.idThread
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })
}
else{
    res.status(401);
    const error = new Error ("Not authorized");
    next(error)
}

})
})

router.delete('/deleteComment',(req,res,next)=>{
    let queryUser = "Select * From comment where idUser= "+req.user._id+" and idComment="+req.body.idComment;
    console.log(queryUser)
    console.log(req.body.idComment);
    knex.schema.raw(queryUser).then(ress=>{
        console.log(ress)
        if(ress.length!=0){
                    let query = "delete comment where idComment ="+req.body.idComment
                    knex.schema.raw(query).then(ress=>{
                        res.json('done');
                    }).catch(err=>{
                        res.status(404);
                        res.json(err);
                    })     
        }
        else{
            res.status(401);
            const error = new Error ("Not authorized");
            next(error)
        }
    })
})

router.delete('/deleteThread',(req,res,next)=>{
    let queryUser = "Select * From thread where idUser= "+req.user._id+" and idThread="+req.body.idThread;
    console.log(queryUser)
    knex.schema.raw(queryUser).then(ress=>{
        console.log(ress)
        if(ress.length!=0){
                    let query = "delete comment where idThread ="+req.body.idThread
                    knex.schema.raw(query).then(ress=>{
                        res.json('done');
                        let querydel = "delete thread where idThread ="+req.body.idThread
                        knex.schema.raw(querydel).then(ressss=>{
                             res.json("terhapus");
                        }).catch(error=>{
                            res.status(404);
                            res.json(erorr);
                        })
                    }).catch(err=>{
                        res.status(404);
                        res.json(err);
                    })     
        }
        else{
            res.status(401);
            const error = new Error ("Not authorized");
            next(error)
        }
    })
})
module.exports = router;