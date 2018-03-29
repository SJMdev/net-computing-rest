const models = require('../database/models/index')

const broadcastGroups = async () => {
   try
  {
    let groups = await models.BroadcastGroup.findAll(
      {
        where : {},
        raw : true
      }
    )
    return groups;
  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'broadcastGroups';
    throw e;
  }
}

const checkBoundaries = async (latitude, longitude ) => {
  let groups = await broadcastGroups();

  let selectedGroups = groups.filter((group) => latitude <= group.top && latitude >= group.bottom && longitude >= group.left && longitude <= group.right)

  return selectedGroups[0].city;
}

module.exports =
{
  checkBoundaries
}