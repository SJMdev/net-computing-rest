const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

router.post('/user', async (req, res) => {

  console.log("POST USER");
  try
  {
    console.log(req.body);
    await api.createUser(req.body);
    res.sendStatus(200);
  }
  catch(err)
  {
    res.sendStatus(500);
  }

});


router.patch('/user', async (req, res) => {

  try
  {
    console.log("PATCH USER");
    await api.updateUser(req.body);
    res.sendStatus(200);
  }
  catch(err)
  {
    res.sendStatus(500);
  }
});

router.delete('/user', async(req, res) => {

  console.log("DELETE USER");
  try
  {
    await api.deleteUser(req.body);
    res.sendStatus(200);
  }
  catch(err)
  {
    res.sendStatus(500);
  }
});

module.exports = router;
