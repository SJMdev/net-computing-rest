const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

router.post('/poi', async (req, res) => {

  console.log("CREATE POI");
  try
  {
    await api.createPOI(req.body);
    res.sendStatus(200);
  }
  catch (err)
  {
    res.sendStatus(500);
  }

});

router.patch('/poi', async (req, res) => {

  console.log("UPDATE POI");
  try
  {
    await api.updatePOI(req.body);
    res.sendStatus(200);
  }
  catch (err)
  {
    res.sendStatus(500);
  }

});



router.delete('/poi', async (req, res) => {

  console.log("DELETE POI");
  try
  {
    await api.deletePOI(req.body);
    res.sendStatus(200);
  }
  catch (err)
  {
    res.sendStatus(500);
  }

});

module.exports = router;
