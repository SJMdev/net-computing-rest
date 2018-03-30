var amqp  = require('amqplib/callback_api');
const API = require('./api');

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

/**
 * Accepts a queue name string and a javascript object as a me
 * @param {string} queue 
 */
const consumeUserLocationMessage = async (queue) => {
  try
  {
    let channel = await createChannel();

    
    channel.assertQueue(queue, {durable: true});
    channel.consume(queue, async (msg) => {


      // console.log(" [x] Received %s", msg.content.toString());
      const buffer = Buffer.from(msg.content);
      const locationUpdate = JSON.parse(buffer.toString());
      await API.updateUser(locationUpdate);

      channel.ack(msg);

    }, {noAck: false});


  }
  catch (err)
  {
    let e = new Error(err);
    e.name = 'sendMessage'
    throw e;
  }
}

module.exports = {
  consumeUserLocationMessage
}