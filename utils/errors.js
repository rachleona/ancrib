function typeError(msg, requiredType, para) 
{
    this.error = new Error(msg),
    this.code = "INPUT_TYPE_ERROR",
    this.para = para 
    this.requiredType = requiredType
}

//TODO plan out exceptions needed
// - missing arg?
// - timeout?

module.exports = { typeError }
