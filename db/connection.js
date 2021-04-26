// const monk =require('monk');
// const db = monk('mongodb://root:game9898@ds151383.mlab.com:51383/forum-basdat')

// module.exports=db;

module.exports ={
    client : 'mssql',
    connection: {
      host : 'xxx',
      user : 'xxx',
      password : 'xxx^^',
      database:'xx',
      LoginTimeout : 30,
      options: {
          port: 1443,
          encrypt: true,
      }
    },
  };
