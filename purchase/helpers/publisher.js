const jackrabbit = require("jackrabbit");

// Rabbit URL
const RABBIT_URL =
  "amqps://vflvhudl:rW2MR7JIOxxJ4wkceDzwzGH_jwih3Kmh@beaver.rmq.cloudamqp.com/vflvhudl";

//publish message
const publish = (data) => {
  // Connect to CloudAMQP
  const rabbit = jackrabbit(RABBIT_URL);
  const exchange = rabbit.default();

  const queue = exchange.queue({ name: "payment", durable: true });
  exchange.publish(data, { key: "payment" });
};

module.exports = publish;
