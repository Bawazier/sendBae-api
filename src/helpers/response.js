module.exports = (response, message, data, status = 200, success = true) => {
  return response.status(status).send({
    success: success,
    message: message,
    ...data,
  });
};
