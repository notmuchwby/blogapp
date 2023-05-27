const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Default error status and message
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Customize error status and message based on error type
    if (err instanceof mongoose.Error.ValidationError) {
      statusCode = 400;
      message = err.message;
    } else if (err instanceof mongoose.Error.CastError) {
      statusCode = 404;
      message = 'Resource not found';
    } // Add additional conditions for other error types if needed
  
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorHandler;