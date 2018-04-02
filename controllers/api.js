const models = require('../database/models/index')
const boundaryAPI = require('./checkboundaries')
const notifications = require('./poi-notification-sender');

const getUser = async (userId) => {
  try 
  {
    let user = await models.User.findOne(
      {
        where: { id: userId },
        include: [
          {
            model: models.BroadcastGroup
          }
        ]
      }
    )
    return user.toJSON();
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'getUser';
    throw e;
  }
}


const createUser = async (body) => {
  try
  {
    let user = await models.User.create(
      {
        name: body.name,
        email: body.email,
        surname: body.surname
      }
    )
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'createUser';
    throw e;
  }
}

const updateUser = async (body) => {
  try
  {
    let updates = {
      ...body
    }

    let cityName = null;
    
    if (body.latitude && body.longitude)
    {
      let city = await boundaryAPI.checkBoundaries(body.latitude, body.longitude);
      updates = {
        ...updates,
        broadcastGroupId: city ? city.id : null
      }

      if (city === undefined || !city)
      {
        city = 'UNKNOWN CITY';
        cityName = city;
      }
      else
        cityName = city.city;

      console.log(`[REST Update User] ${body.id} with LONG ${body.longitude}, LAT ${body.latitude} is located in ${city.city}`);
    }

    let previousUser = await models.User.findOne({
      where: { id: body.id }
    })

    let previousBroadCastGroupId = previousUser.dataValues.broadcastGroupId;

    await previousUser.update(
      updates,
      { }
    );

    if (previousBroadCastGroupId != previousUser.dataValues.broadcastGroupId)
    {
      console.log('CHANGE IN AREA')
      notifications.sendNewBroadcastGroup(body.id, cityName);
    }

  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'updateUser';
    throw e;
  }
}

const deleteUser = async (userId) => {
  try
  { 
    await models.User.destroy(
      {
        where: { id: userId }
      }
    )
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'deleteUser';
    throw e;
  }
}

//-------------POI--------------------
const getPOI = async (POIId) =>
{
  try
  {
    let POI = await models.POI.findOne(
      {
        where: { id: POIId }
      }
    )
    return POI;
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'getPOI';
    throw e;
  }
}

const getPOIs = async () => {
  try
  {
    let POIs = await models.POI.findAll(
      {
        where: {}
      }
    )
    return POIs;
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'getPOIs';
    throw e;
  }
}

const createPOI = async (body) => {
  try
  {
    let city = await boundaryAPI.checkBoundaries(body.latitude, body.longitude)

    await models.POI.create(
      {
        creatorId: body.creatorId,
        eventTypeId: body.eventTypeId,
        broadcastGroupId: city ? city.id : null,
        expirationDate: new Date() + 3600 * 1000, // add one hour expiration date
        latitude: body.latitude,
        longitude: body.longitude,
        description: body.description,
      }
    )

    if (city)
    {
      console.log('[REST POI Created] send notification to user')
      notifications.sendPOINotification(city.city, body);
    }
    console.log('POI created');

  }
  catch (err)
  {
    let e = new Error(err);
    console.log(err)
    e.name = 'createPOI';
    throw e;
  }
}

const deletePOI = async (POIId) => {
  try
  {
    await models.POI.destroy(
      {
        where: { id: POIId }
      }
    )
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'deletePOI';
    throw e;
  }
}

const updatePOI = async (body) => {
  try
  {
    await models.POI.update(
      body,
      {
        where: body.id
      }
    )
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'updatePOI';
    throw e;
  }
}



module.exports =
{
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getPOI,
  createPOI,
  deletePOI,
  updatePOI,
  getPOIs
}