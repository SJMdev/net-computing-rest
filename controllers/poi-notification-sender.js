var amqp  = require('amqplib/callback_api');

const createConnection = () => {
  return new Promise((resolve, reject) => {

    amqp.connect('amqp://localhost', (err, connection) => {
      if (err)
        return reject(err)
      
      resolve(connection);
    })

  })
}

const createChannel = () => {
  return new Promise(async (resolve, reject) => {
    try
    {
      let connection = await createConnection();
      connection.createChannel((err, channel) => {
        if (err)
          return reject(err)

        resolve(channel);
      })
    }
    catch (err)
    {
      reject(err);
    }
  })
}

const sendPOINotification = async (city, msg) => {
  try
  {
    let exchange = 'poi-notification';

    let channel = await createChannel();

    console.log(`[REST Send Notification] for topic ${city} with content ${msg}`)

    channel.assertExchange(exchange, 'direct', {durable: false});
    channel.publish(exchange, city, Buffer.from(JSON.stringify(msg)));


  }
  catch (err)
  {
    console.log('Create exchange error!')
    console.log(err);
  }
}

const sendNewBroadcastGroup = async (UUID, city) => {
  try
  { 
    let queue = UUID;

    let channel = await createChannel();

    channel.assertQueue(queue, {durable: false});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(city)));
  }
  catch (err)
  {
    console.log('Could not send new broadcast group error!')
    console.log(err);
  }
}

module.exports = {
  sendPOINotification,
  sendNewBroadcastGroup
}