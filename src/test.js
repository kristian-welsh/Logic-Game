function assert(condition, failMessage) {
  message = "An assertion has failed with no error message"
  if(failMessage)
    message = "An assertion has failed with this error message: " + failMessage 
  if(!condition)
    throw message
}
