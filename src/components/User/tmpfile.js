
 export function exceptionsFilter(targetMethod) {
    return async (req, res, next) => {
        try {
            await targetMethod(req, res, next);
        } catch (error) {
            if (error instanceof ValidationError) {
                         return res.status(422).json({
                             message: error.name,
                             details: error.message,
                             statusCode: 422
                         });
                     }
            
                     res.status(500).json({
                         message: error.message,
                         details: null,
                         statusCode: 500
                     });
            
                     return next(error);
        }
    }
}