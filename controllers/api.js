const models = require('../database/models/index')
const boundaryAPI = require('./checkboundaries')

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

    
    if (body.latitude && body.longitude)
    {
      let city = await boundaryAPI.checkBoundaries(body.latitude, body.longitude);
      updates = {
        ...updates,
        broadcastGroupId: city ? city.id : null
      }
      if (city === undefined || !city)
        city = 'UNKNOWN CITY';

      console.log(`[REST Update User] ${body.id} with LONG ${body.longitude}, LAT ${body.latitude} is located in ${city.city}`);
    }

    await models.User.update(
      updates,
      {
        where: { id : body.id }
      }
    );

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
    
    console.log(body)

    await models.POI.create(
      {
        creatorId: body.creatorId,
        eventTypeId: body.eventTypeId,
        broadcastGroupId: city.id,
        expirationDate: new Date() + 3600 * 1000, // add one hour expiration date
        latitude: body.latitude,
        longitude: body.longitude,
        description: body.description,
      }
    )

    console.log('POI created');
  }
  catch (err)
  {
    let e = new Error(err);
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