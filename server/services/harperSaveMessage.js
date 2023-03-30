var axios = require('axios');


function harperSaveMessage ( userName, room, message )  {

    const urlDB = process.env.REACT_APP_HARPERDB_PW;
    const pwDB = process.env.REACT_APP_HARPERDB_PW

    if( !urlDB || !pwDB ) return null

  var data = JSON.stringify({
      operation: 'insert',
      schema: 'realtime_chat',
      table: 'messages',
      records: [
        {
          message,
          userName,
          room,
        },
      ],
    });
  
    var config = {
      method: 'post',
      url: urlDB,
      headers: {
        'Content-Type': 'application/json',
        Authorization: pwDB,
      },
      data: data,
    };
      
    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          resolve(JSON.stringify(response.data));
        })
        .catch(function (error) {
          reject(error);
        });
    });
    
}


module.exports = harperSaveMessage;