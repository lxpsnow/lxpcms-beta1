const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  'localhost',
  user     :  'feiyucms',
  password :  'feiyucmsluziwang',
  database :  'feiyucms'
})

//将数据库的异步操作，封装在一个Promise中
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
		let sql2 = mysql.format(sql, values);
        connection.query(sql2, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }