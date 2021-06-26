class HttpException extends Error {

  constructor(status, message) {
    super(message);
    HttpException.status = status;
    HttpException.message = message;
  }
}

export default HttpException;
