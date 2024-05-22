module.exports = (io) => {
  const createMessage = (payload) => {
    const socket = this;
    console.log("message:created", payload)
  }

  const readMessage = (orderId, callback) => {
    console.log(orderId, callback)
  }

  return {
    createMessage,
    readMessage
  }
}