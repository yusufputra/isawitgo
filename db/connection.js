// const monk =require('monk');
// const db = monk('mongodb://root:game9898@ds151383.mlab.com:51383/forum-basdat')

// module.exports=db;

module.exports ={
    client : 'mysql',
    connection: {
      server : 'localhost',
      user : 'username here',
      password : 'password here',
      database:'isawit',
      options: {
          port: 4406,
          encrypt: true
      }
    }
  };
