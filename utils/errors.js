function typeError(msg, requiredType, para) 
{
    const internal = {
        error: new Error(msg),
        code: "INPUT_TYPE_ERROR",
        para, 
        requiredType
    }

    return {
        ...internal,
        toJSON: () => ({
            code: internal.code,
            stack: internal.error.stack,
            para,
            msg,
            requiredType
        })
    }
}

//TODO plan out exceptions needed
// - missing arg?
// - timeout?

module.exports = { typeError }
