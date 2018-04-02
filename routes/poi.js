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

router.delete('/poi/:id', async (req, res) => {

  console.log("DELETE POI");
  try
  {
    await api.deletePOI(req.params.id);
    res.sendStatus(200);
  }
  catch (err)
  {
    res.sendStatus(500);
  }

});

router.get('/poi/:id', async (req, res) => {

  console.log("GET POI");
  try
  {
    let POI = await api.getPOI(req.params.id);
    res.status(200).json(POI);
  }
  catch (err)
  {
    res.sendStatus(500);
  }

});

router.get('/pois', async (req, res) => {
  try
  {
    let POIs = await api.getPOIs();
    return res.status(200).json(POIs);
  }
  catch (err)
  {
    res.sendStatus(500);
  }
})

module.exports = router;
