const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/models/index');




const app = express();
app.use(bodyParser.urlencoded({'extended': 'false' }));
app.use(bodyParser.json());



app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/poi'));



sequelize
  .sequelize.authenticate()
  .then(() => {
    const port = 1337;
    app.listen(port);
  })
  .catch(err => {
    console.log("could not start database");
    console.log(err);
  });



