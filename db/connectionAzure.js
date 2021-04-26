
  
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


  // module.exports ={
  //   client : 'mysql',
  //   connection: {
  //     host : 'https://srv46.niagahoster.com/',
  //     user : 'u5086307_isawit',
  //     password : 'pagikucerahku2021^^',
  //     database:'u5086307_isawit',
  //     options: {
  //         port: 3306,
  //         encrypt: true,
  //     }
  //   },
  // };