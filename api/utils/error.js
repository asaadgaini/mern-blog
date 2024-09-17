export const errorHandler = (statucCode,message) =>{
    const error = new Error()
    error.statucCode = statucCode
    error.message= message
    return error
}