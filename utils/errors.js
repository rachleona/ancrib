function typeError(msg, requiredType, para) {
  this.error = new Error(msg)
  this.code = "INPUT_TYPE_ERROR"
  this.para = para
  this.requiredType = requiredType
  this.msg = msg
}

function argError(msg, para=null) {
  this.error = new Error(msg)
  this.code = "API_MISSING_FAULTY_ARG"
  this.msg = msg
  this.missing = para
}

function apiError() {
  this.error = new Error("Server error!")
  this.code = "SERVER_ERROR"
  this.msg = "Server error!"
}

//TODO plan out exceptions needed
// - missing arg?
// - timeout?

module.exports = { typeError, argError, apiError }
