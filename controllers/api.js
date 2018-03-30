const models = require('../database/models/index')
const boundaryAPI = require('./checkboundaries')
const notifications = require('./poi-notification-sender');

const createUser = async (body) => {
  try
  {
    console.log('user created');
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

    console.log(`current: ${previousBroadCastGroupId}`);
    console.log(`new: ${previousUser.dataValues.broadcastGroupId}`);
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

const deleteUser = async (body) => {
  try
  {
    console.log('user deleted!');

  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'deleteUser';
    throw e;
  }
}

//-------------POI--------------------
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

const deletePOI = async (body) => {
  try
  {
    console.log('POI deleted');
    console.log(body);
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
    console.log('POI updated');
    console.log(body);
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
  createPOI,
  deletePOI,
  updatePOI

}