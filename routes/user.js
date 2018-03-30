const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

router.post('/user', async (req, res) => {

  console.log("POST USER");
  try
  {
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

router.delete('/user/:id', async(req, res) => {

  console.log("DELETE USER");
  try
  {
    await api.deleteUser(req.params.id);
    res.sendStatus(200);
  }
  catch(err)
  {
    res.sendStatus(500);
  }
});

router.get('/user/:id', async (req, res) => {
  console.log("GET USER");
  try
  {
    let user = await api.getUser(req.params.id);
    res.status(200).json(user);
  }
  catch(err)
  {
    console.log(err);
    res.sendStatus(500);
  }
})

module.exports = router;
