const HTTP_CODE = {
    SUCCESS: {
        OK: {
            CODE: 200,
            TEXT: 'OK',
        },
        CREATED:{
            CODE: 201,
            TEXT: 'Created',
        },
        ACCEPTED: {
            CODE: 202,
            TEXT: 'Accepted',
        }
    },
    SERVER_ERROR:{
        INTERNAL_SERVER_ERROR:{
            CODE: 500,
            TEXT: 'Internal Server Error'
        },
        UNAUTHORIZED:{
            CODE: 401,
            TEXT: 'Unauthorized'
        },
        NOT_FOUND:{
            CODE: 404,
            TEXT: 'Not found'
        },
        REMOVED:{
            CODE: 410,
            TEXT: 'Removed'
        },
        FORBIDDEN:{
            CODE: 403,
            TEXT: 'Forbidden'
        },
        CONFLICT:{
            CODE: 409,
            TEXT: 'Conflict'
        },
        BAD_REQUEST:{
            CODE: 400,
            TEXT: 'Bad Request'
        },
        AUTHENTICATION_TIMEOUT:{
            CODE: 419,
            TEXT: 'AuthenticationTimeout'
        }
    }
};
module.exports = {
    HTTP_CODE
};