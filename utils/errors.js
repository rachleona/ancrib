function typeError(msg, requiredType, para) 
{
    this.error = new Error(msg)
    this.code = "INPUT_TYPE_ERROR"
    this.para = para 
    this.requiredType = requiredType
}

function argError(msg, problem, para)
{
    this.error = new Error(msg)
    this.code = "FAULTY_INPUT"
    this.para = para
    this.problem = problem
}

//TODO plan out exceptions needed
// - missing arg?
// - timeout?

module.exports = { typeError, argError }
