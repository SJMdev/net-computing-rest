const models = require('../database/models/index')
const boundaryAPI = require('./checkboundaries')

const createUser = async (body) => {
  try
  {
    console.log('user created');
    console.log(body);
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
    console.log('user updated!');
    console.log(body)
    await models.User.update(
      body, 
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
    console.log('POI created');
    let cityName = boundaryAPI.checkBoundaries(body.latitude, body.longitude)
    console.log(body);
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