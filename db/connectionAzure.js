
  
module.exports ={
    client : 'mssql',
    connection: {
      server : 'localhost',
      user : 'sa',
      password : 'password1%',
      database:'knpi',
      options: {
          port: 1433,
          encrypt: true
      }
    }
  };


  